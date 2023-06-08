import { NextFunction, Request, Response } from "express";
import { validateDataBySchema } from "../helpers/validateSchema.helper.js";
import { unauthorizedRequestResponse } from "../helpers/response.helper.js";
import { signUpSchema } from "../schemas/user.schema.js";

function validateSignUpData(req: Request, res: Response, next: NextFunction) {
  const errors: string[] | false = validateDataBySchema(req.body, signUpSchema);
  if (errors) return unauthorizedRequestResponse(res, errors);

  next();
}

export { validateSignUpData };
