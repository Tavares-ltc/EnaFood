import { IApplicationError } from "../interfaces/IError.js";

function notFoundError(): IApplicationError {
  return {
    name: "notFoundError",
    message: "No result for this search!",
  };
}

export { notFoundError };
