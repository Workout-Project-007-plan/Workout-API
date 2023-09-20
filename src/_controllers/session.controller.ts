import { Request, Response } from "express";
import { TUserLogin } from "../interfaces/user.interface";
import {
  createSessionService,
  reactiveAccountService,
} from "../_services/session.service";

export const createSessionController = async (req: Request, res: Response) => {
  const sessionData: TUserLogin = req.body;
  const token = await createSessionService(sessionData);
  return res.status(200).json({ token });
};

export const reactiveAccountController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userEmail: string = req.body.email;

  const updatedUser = await reactiveAccountService(userEmail);
  return res.status(200).json(updatedUser);
};
