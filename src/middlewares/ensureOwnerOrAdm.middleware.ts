import { NextFunction, Request, Response } from "express";
import AppError from "../errors";
import dataSource from "../data-source";
import { User } from "../entities/users.entity";

export const ensureOwnerOrAdmMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const loggedUser = req.user.id;
  const userRepository = dataSource.getRepository(User);

  const foundUser = await userRepository.findOneBy({ id: loggedUser });

  if (!foundUser.is_adm) {
    if (loggedUser !== req.params.id) {
      throw new AppError(
        "You don't have permissions to perform this action",
        401
      );
    }
  }

  //   if (loggedUser !== req.params.id) {
  //     throw new AppError(
  //       "You don't have permissions to perform this action",
  //       401
  //     );
  //   }
  return next();
};
