import { Request, Response } from "express";
import { TUserLogin } from "../interfaces/user.interface";
import { createSessionService } from "../_services/session.service";

export const createSessionController = async (req: Request, res: Response) => {
  const sessionData: TUserLogin = req.body;
  const token = await createSessionService(sessionData);
  return res.status(200).json({ token });
};
