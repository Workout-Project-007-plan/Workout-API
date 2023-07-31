import "express-async-errors";
import "reflect-metadata"
import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors"

export const app: Application = express();
app.use(bodyParser.json())
app.use(cors())
