/*
 * Much of this code is copied directly from
 * https://github.com/ethers-io/ethers.js/blob/master/packages/providers/src.ts/web3-provider.ts
 */
import { defineReadOnly } from "@ethersproject/properties";
import { Logger } from "@ethersproject/logger";
import { Networkish } from "@ethersproject/networks";
import { ExternalProvider } from "@ethersproject/providers";

import { JsonRpcMultiProvider, getError } from "./JsonRpcMultiProvider";

const logger = new Logger("providers/5.1.2");

let _nextId = 1;

export type JsonRpcFetchFunc = (method: string, params?: Array<any>) => Promise<any>;

type Web3LegacySend = (request: any, callback: (error: Error, response: any) => void) => void;

function buildWeb3LegacyFetcher(provider: ExternalProvider, sendFunc: Web3LegacySend): JsonRpcFetchFunc {
    return function (method: string, params: Array<any>): Promise<any> {
        // Metamask complains about eth_sign (and on some versions hangs)
        if (method === "eth_sign" && (provider.isMetaMask || provider.isStatus)) {
            // https://github.com/ethereum/go-ethereum/wiki/Management-APIs#personal_sign
            method = "personal_sign";
            params = [params[1], params[0]];
        }

        const request = {
            method,
            params,
            id: _nextId++,
            jsonrpc: "2.0",
        };

        return new Promise((resolve, reject) => {
            sendFunc(request, function (error, result) {
                if (error) {
                    return reject(error);
                }

                if (result.error) {
                    const error = new Error(result.error.message);
                    (<any>error).code = result.error.code;
                    (<any>error).data = result.error.data;
                    return reject(error);
                }

                resolve(result.result);
            });
        });
    };
}

function buildEip1193Fetcher(provider: ExternalProvider): JsonRpcFetchFunc {
    return function (method: string, params: Array<any>): Promise<any> {
        if (params == null) {
            params = [];
        }

        // Metamask complains about eth_sign (and on some versions hangs)
        if (method === "eth_sign" && (provider.isMetaMask || provider.isStatus)) {
            // https://github.com/ethereum/go-ethereum/wiki/Management-APIs#personal_sign
            method = "personal_sign";
            params = [params[1], params[0]];
        }

        return provider.request({ method, params });
    };
}

function getProviderComponents(
    provider: ExternalProvider | JsonRpcFetchFunc,
): { path: string; jsonRpcFetchFunc: JsonRpcFetchFunc; subprovider: ExternalProvider | null } {
    let path: string = null;
    let jsonRpcFetchFunc: JsonRpcFetchFunc = null;
    let subprovider: ExternalProvider = null;

    if (typeof provider === "function") {
        path = "unknown:";
        jsonRpcFetchFunc = provider;
    } else {
        path = provider.host || provider.path || "";
        if (!path && provider.isMetaMask) {
            path = "metamask";
        }

        subprovider = provider;

        if (provider.request) {
            if (path === "") {
                path = "eip-1193:";
            }
            jsonRpcFetchFunc = buildEip1193Fetcher(provider);
        } else if (provider.sendAsync) {
            jsonRpcFetchFunc = buildWeb3LegacyFetcher(provider, provider.sendAsync.bind(provider));
        } else if (provider.send) {
            jsonRpcFetchFunc = buildWeb3LegacyFetcher(provider, provider.send.bind(provider));
        } else {
            logger.throwArgumentError("unsupported provider", "provider", provider);
        }

        if (!path) {
            path = "unknown:";
        }
    }

    return {
        path,
        jsonRpcFetchFunc,
        subprovider,
    };
}

export class Web3MultiProvider extends JsonRpcMultiProvider {
    readonly providers: ExternalProvider[];

    readonly jsonRpcFetchFuncs: JsonRpcFetchFunc[];

    constructor(providers: (ExternalProvider | JsonRpcFetchFunc)[], network?: Networkish) {
        logger.checkNew(new.target, Web3MultiProvider);

        if (providers == null) {
            logger.throwArgumentError("missing provider", "provider", providers);
        }

        const paths: string[] = [];
        const jsonRpcFetchFuncs: JsonRpcFetchFunc[] = [];
        const subproviders: ExternalProvider[] = [];

        for (let i = 0; i < providers.length; i++) {
            const provider = providers[i];

            const { path, jsonRpcFetchFunc, subprovider } = getProviderComponents(provider);

            paths.push(path);
            jsonRpcFetchFuncs.push(jsonRpcFetchFunc);
            subproviders.push(subprovider);
        }

        super(paths, network);

        defineReadOnly(this, "jsonRpcFetchFuncs", jsonRpcFetchFuncs);
        defineReadOnly(this, "providers", subproviders);
    }

    send(method: string, params: Array<any>): Promise<any> {
        return this._performRequests(method, params);
    }

    private async _performRequests(method: string, params: Array<any>): Promise<any> {
        let result;
        const errors: string[] = [];

        for (let i = 0; i < this.jsonRpcFetchFuncs.length; i++) {
            const fetch = this.jsonRpcFetchFuncs[i];

            try {
                result = await fetch(method, params);

                return result;
            } catch (error) {
                const errMessage = (error.message || error).toString();

                errors.push(errMessage);
            }
        }

        const error = getError(errors);
        throw error;
    }
}
