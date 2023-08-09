import { NextFunction, Request, Response } from "express";
import AppError from "../errors";

const handleError = (error: Error, req: Request, res: Response, next: NextFunction): Response=> {
if(error instanceof AppError){
    return res.status(error.statusCode).json({message: error.message})
}
    console.error(error)
    return res.status(500).json({message: "Internal Server Error"})
}

export default handleError