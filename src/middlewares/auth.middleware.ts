import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import { unauthorizedRequestResponse } from "../helpers/response.helper.js";
import sessionRepository from "../repositories/session.repository.js";

dotenv.config();

async function checkAuthorization(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authorization = String(req.headers?.authorization);
    if (!authorization) return unauthorizedRequestResponse(res);
    const token = authorization.replace("Bearer ", "");
  interface JwtPayload {
    userId: string;
    date: string;
  }
  try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET) as JwtPayload;
      console.log(decoded)
      const userId = decoded.userId;
      const userToken = (await sessionRepository.findLastSessionByUserId(userId));
      if (!userToken || token !== userToken.token) {
          return unauthorizedRequestResponse(res);
      }
      res.locals.userId = userId;
      next();
  } catch (error) {
      return unauthorizedRequestResponse(res);
  }
}

export default checkAuthorization;
