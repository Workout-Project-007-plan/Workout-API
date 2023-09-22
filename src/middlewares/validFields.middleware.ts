import { NextFunction, Request, Response } from "express";
import { ZodError, ZodTypeAny } from "zod";
import AppError from "../errors";

export const validFieldsMiddleware =
  (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const validateData = schema.parse(req.body);
      req.body = validateData;

      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        throw new AppError("Invalid data, please try with new data.", 400);
      }
    }
  };
