import { NextFunction, Request, Response } from "express";
import { validateDataBySchema } from "../helpers/validateSchema.helper.js";
import { unauthorizedRequestResponse } from "../helpers/response.helper.js";
import { createOrderSchema } from "../schemas/order.schema.js";

function validateOrderCreationData(req: Request, res: Response, next: NextFunction) {
  const errors: string[] | false = validateDataBySchema(req.body, createOrderSchema);
  if (errors) return unauthorizedRequestResponse(res, errors);

  next();
}

export { validateOrderCreationData };
