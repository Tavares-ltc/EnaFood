import { IApplicationError } from "../interfaces/IError.js";

function conflictError(message: string): IApplicationError {
  return {
    name: "ConflictError",
    message,
  };
}

export { conflictError };
