import { Router } from "express";
import { validateSignUpData } from "../middlewares/validateSignUpData.middleware.js";
import userController from "../controllers/user.controller.js";

const userRouter = Router();

userRouter
.post("/signup", validateSignUpData, userController.signup);

export { userRouter };
