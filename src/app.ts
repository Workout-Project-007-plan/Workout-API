import "express-async-errors";
import "reflect-metadata"
import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors"
import { userRouter } from "./routes";
import handleError from "./middlewares/handleErrors.middleware";

export const app: Application = express();
app.use(bodyParser.json())
app.use(cors())
app.use("/users", userRouter)

app.use(handleError)