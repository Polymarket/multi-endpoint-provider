import { MultiError } from "./types";

export const getError = (errors: string[]): MultiError =>
    new MultiError(`Rpc requests unsuccessful.\n${errors.map(err => ` ${err}`).join("\n")}`, errors);
