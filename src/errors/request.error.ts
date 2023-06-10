import { IRequestError } from "../interfaces/IError.js";

function requestError(status: number, statusText: string): IRequestError {
  return {
    name: "requestError",
    data: null,
    status,
    statusText,
    message: "No result for this search!",
  };
}

export { requestError };
