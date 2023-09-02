import { Request, Response } from "express";
import { TUserSignUp } from "../interfaces/user.interface";
import { createUserService } from "../_services/users.services";

export const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: TUserSignUp = req.body;
  const newUser = await createUserService(userData);
  return res.status(201).json(newUser);
};
