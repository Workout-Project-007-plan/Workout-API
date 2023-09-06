import { NextFunction, Request, Response } from "express";
import AppError from "../errors";

export const updateDataMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const updateData = req.body;

  if (
    updateData.is_adm !== undefined ||
    updateData.id !== undefined ||
    updateData.is_active !== undefined
  ) {
    throw new AppError("You don't have permissions to update this Data", 403)
  }
};
