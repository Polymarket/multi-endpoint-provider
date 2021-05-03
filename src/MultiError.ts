export class MultiError extends Error {
    errors: Error[];

    constructor(message: string, errors: Error[]) {
        super(message);
        this.name = "RelayerError";
        this.errors = errors;
    }
}
