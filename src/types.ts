import { Networkish } from "@ethersproject/networks";

export class MultiError extends Error {
    errors: string[];

    constructor(message: string, errors: string[]) {
        super(message);
        this.name = "RelayerError";
        this.errors = errors;
    }
}

export type HandleErrorFunc = (e: any, endpointIndex: number) => void;

export type ProviderOptions = {
    network?: Networkish;
    handleRequestError?: HandleErrorFunc;
};
