import { JsonRpcProvider } from "@ethersproject/providers";

import { JsonRpcFetchFunc } from "../src";

const getJsonProvider = (endpoint: string) => new JsonRpcProvider(endpoint);

export const getMockFetchFunction = (endpoint: string): JsonRpcFetchFunc => {
    const fetch = async (method: string, params?: Array<any>): Promise<any> => {
        const provider = getJsonProvider(endpoint);
        return provider.send(method, params);
    };

    return fetch;
};
