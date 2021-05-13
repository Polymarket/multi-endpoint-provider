import { JsonRpcProvider } from "@ethersproject/providers";
import { fetchJson } from "@ethersproject/web";
import { deepCopy, defineReadOnly } from "@ethersproject/properties";

import { HandleErrorFunc, ProviderOptions } from "./types";
import { getError } from "./utils";

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

    readonly handleRequestError: HandleErrorFunc;

    constructor(rpcUrls: string[], options?: ProviderOptions) {
        super(rpcUrls[0], options?.network);

        defineReadOnly(this, "handleRequestError", options?.handleRequestError);
        defineReadOnly(this, "rpcUrls", rpcUrls);
    }

    send(method: string, params: Array<any>): Promise<any> {
        return this._send(method, params);
    }

    async _send(method: string, params: Array<any>): Promise<any> {
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

        const cache = ["eth_chainId", "eth_blockNumber"].indexOf(method) >= 0;
        if (cache && this._cache[method]) {
            return this._cache[method];
        }

        const errors: string[] = [];
        let result;

        for (let i = 0; i < this.rpcUrls.length; i++) {
            try {
                result = await fetchJson(this.rpcUrls[i], JSON.stringify(request), getResult);

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

                if (this.handleRequestError) this.handleRequestError(error, i);

                const errMessage = (error.message || error).toString();

                errors.push(errMessage);
            }
        }

        const error = getError(errors);
        throw error;
    }
}
