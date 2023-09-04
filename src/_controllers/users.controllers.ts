import { Request, Response } from "express";
import { TUserSignUp } from "../interfaces/user.interface";
import {
  createUserService,
  retrieveUserService,
  retrieveUsersService,
} from "../_services/users.services";

export const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: TUserSignUp = req.body;
  const newUser = await createUserService(userData);
  return res.status(201).json(newUser);
};
export const retrieveUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: string = req.params.id;
  const foundUser = await retrieveUserService(userId);
  return res.status(201).json(foundUser);
};
export const retrieveUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const foundUsers = await retrieveUsersService();
  return res.status(201).json(foundUsers);
};
