import { Request, Response } from "express";
import { TUserSignUp, TUserUpdate } from "../interfaces/user.interface";
import {
  createUserService,
  deleteUserService,
  retrieveUserService,
  retrieveUsersService,
  updateUserService,
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
  return res.status(200).json(foundUser);
};

export const retrieveUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const foundUsers = await retrieveUsersService();
  return res.status(200).json(foundUsers);
};

export const updateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newData: TUserUpdate = req.body;
  const userId: string = req.params.id;
  const updatedUser = await updateUserService(userId, newData);
  return res.status(201).json(updatedUser);
};

export const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: string = req.params.id;
  await deleteUserService(userId);
  return res.status(204).json();
};
