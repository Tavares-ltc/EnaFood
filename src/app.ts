import express from "express";
import cors from "cors";
import { userRouter } from "./routers/user.router.js";
import { productRouter } from "./routers/product.router.js";
import { orderRouter } from "./routers/order.router.js";

const app = express();

app
.use(cors())
.use(express.json())
.use(userRouter)
.use(productRouter)
.use(orderRouter)

export { app };
