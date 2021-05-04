export class MultiError extends Error {
    errors: string[];

    constructor(message: string, errors: string[]) {
        super(message);
        this.name = "RelayerError";
        this.errors = errors;
    }
}
