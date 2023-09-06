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
      403
    );
  }

  return next()
};

// email: z.string().email("Invalid E-mail format"),
// password: z.string().min(6, "Password need to be 6 characters").max(6),
// name: z.string().min(3),
// gender: z.string().min(3).max(10),
// height: z.number().max(4),
// age: z.number().max(120),
// weight: z.number().max(250),
// weight_goal: z.number().max(150),
