import { Request, Response } from "express";
import {
  conflictResponse,
  okResponse,
  serverErrorResponse,
  unauthorizedRequestResponse,
} from "../helpers/response.helper.js";
import { IUserData } from "../interfaces/IUser.js";
import userService from "../services/user.service.js";

async function signup(req: Request, res: Response) {
  const { name, email, password, address, phone }: IUserData = req.body;

  const userData: IUserData = { name, email, password, address, phone };

  try {
    await userService.createUser(userData);
    okResponse(res);
  } catch (error) {
    if (error.name === "ConflictError") {
      return conflictResponse(res, "email already in use");
    }
    serverErrorResponse(res);
  }
}

async function signin(req: Request, res: Response) {
  const { password, email }: { password: string; email: string } = req.body;

  try {
    const user = await userService.getUser(password, email);
    okResponse(res, user);
  } catch (error: any) {
    if (error.name === "RequestError") {
      return unauthorizedRequestResponse(res, "Check email and password");
    }
    serverErrorResponse(res, error.message);
  }
  return;
}

const userController = {
  signup,
  signin,
};

export default userController;
