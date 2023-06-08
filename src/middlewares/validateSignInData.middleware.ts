import { NextFunction, Request, Response } from "express";
import { validateDataBySchema } from "../helpers/validateSchema.helper.js";
import { unauthorizedRequestResponse } from "../helpers/response.helper.js";
import { signInSchema} from "../schemas/user.schema.js";

function validateSignInData(req: Request, res: Response, next: NextFunction) {
  const errors: string[] | false = validateDataBySchema(req.body, signInSchema);
  if (errors) return unauthorizedRequestResponse(res, errors);

  next();
}

export { validateSignInData };
