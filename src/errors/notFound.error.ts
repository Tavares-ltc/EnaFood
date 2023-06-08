import { IApplicationError } from "../interfaces/IError.js";

function notFoundError(): IApplicationError {
  return {
    name: "NotFoundError",
    message: "No result for this search!",
  };
}

export { notFoundError };
