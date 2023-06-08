import { Request, Response } from "express";
import {
  conflictResponse,
  okResponse,
  serverErrorResponse,
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
      conflictResponse(res, "email already in use");
    }
    serverErrorResponse(res);
  }
}

const userController = {
  signup,
};

export default userController;
