import "express-async-errors";
import express, { Application } from "express";
import bodyParser from "body-parser";

export const app: Application = express();
app.use(bodyParser.json())

const PORT: number = 3000;
app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`))