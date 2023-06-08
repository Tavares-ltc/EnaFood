import { Router } from "express";
import { validateSignUpData } from "../middlewares/validateSignUpData.middleware.js";
import userController from "../controllers/user.controller.js";
import { validateSignInData } from "../middlewares/validateSignInData.middleware.js";
import checkAuthorization from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter
.post("/signup", validateSignUpData, userController.signup)
.post("/signin", validateSignInData, userController.signin)
export { userRouter };
