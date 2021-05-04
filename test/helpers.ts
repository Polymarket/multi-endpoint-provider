import { JsonRpcProvider } from "@ethersproject/providers";

const getJsonProvider = (endpoint: string) => new JsonRpcProvider(endpoint);

export const getMockExternalProvider = (endpoint: string): ExternalProvider => ({
    send: (request: SendPayload, callback: SendCallback) => {
        switch (request.method) {
            default: {
                const provider = getJsonProvider(endpoint);
                provider
                    .send(request.method, request?.params || [])
                    .then((result: any) => {
                        callback(null, { result });
                    })
                    .catch((err: any) => {
                        callback({ error: err.toString() }, null);
                    });
            }
        }
    },
});
