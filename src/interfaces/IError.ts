interface IRequestError {
  status: number;
  data: object | null;
  statusText: string;
  name: string;
  message: string;
}

interface IApplicationError {
  name: string;
  message: string;
}

export { IRequestError, IApplicationError };
