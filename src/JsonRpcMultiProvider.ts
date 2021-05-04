import { JsonRpcProvider } from "@ethersproject/providers";
import { Networkish } from "@ethersproject/networks";
import { fetchJson } from "@ethersproject/web";
import { deepCopy, defineReadOnly } from "@ethersproject/properties";

import { MultiError } from "./MultiError";

export const getError = (errors: string[]): MultiError =>
    new MultiError(`Rpc requests unsuccessful.\n${errors.map(err => ` ${err}`).join("\n")}`, errors);

// new MultiError(`Rpc requests unsuccessful.\n${errors.map(err => ` ${err}`).join("\n")}`, errors);

function getResult(payload: { error?: { code?: number; data?: any; message?: string }; result?: any }): any {
    if (payload.error) {
        // @TODO: not any
        const error: any = new Error(payload.error.message);
        error.code = payload.error.code;
        error.data = payload.error.data;
        throw error;
    }

    return payload.result;
}

export class JsonRpcMultiProvider extends JsonRpcProvider {
    readonly rpcUrls: string[];

    constructor(rpcUrls: string[], network?: Networkish) {
        super(rpcUrls[0], network);

        defineReadOnly(this, "rpcUrls", rpcUrls);
    }

    send(method: string, params: Array<any>): Promise<any> {
        const request = {
            method,
            params,
            id: this._nextId++,
            jsonrpc: "2.0",
        };

        this.emit("debug", {
            action: "request",
            request: deepCopy(request),
            provider: this,
        });

        return this._send(request);
    }

    private async _send(request: { method: string; params: Array<any>; id: number; jsonrpc: string }): Promise<any> {
        const { method } = request;

        const cache = ["eth_chainId", "eth_blockNumber"].indexOf(method) >= 0;
        if (cache && this._cache[method]) {
            return this._cache[method];
        }

        const errors: string[] = [];
        let result;

        for (let i = 0; i < this.rpcUrls.length; i++) {
            try {
                result = await fetchJson(this.rpcUrls[0], JSON.stringify(request), getResult);

                this.emit("debug", {
                    action: "response",
                    request,
                    response: result,
                    provider: this,
                });

                // Cache the fetch, but clear it on the next event loop
                if (cache) {
                    this._cache[method] = result;
                    setTimeout(() => {
                        // @ts-ignore the inherited class expects this behavior
                        this._cache[method] = null;
                    }, 0);
                }

                return result;
            } catch (error) {
                this.emit("debug", {
                    action: "response",
                    error,
                    request,
                    provider: this,
                });

                const errMessage = (error.message || error).toString();

                errors.push(errMessage);
            }
        }

        const error = getError(errors);
        throw error;
    }
}
