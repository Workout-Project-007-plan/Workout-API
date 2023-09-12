import { NextFunction, Request, Response } from "express";
import AppError from "../errors";

export const signUpFieldsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {email, password, name, gender, height, age, weight, weight_goal} =
    req.body;
  if (
    !email ||
    !password ||
    !name ||
    !gender ||
    !height ||
    !age ||
    !weight ||
    !weight_goal
  ) {
    throw new AppError(
      "You need to fulfill all the required fields to create an account",
      400
    );
  }

  return next()
};
