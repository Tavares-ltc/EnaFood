import express from "express";
import cors from "cors";
import { userRouter } from "./routers/user.router.js";

const app = express();

app
.use(cors())
.use(express.json())
.use(userRouter)

export { app };
