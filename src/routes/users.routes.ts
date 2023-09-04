import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  retrieveUserController,
  retrieveUsersController,
  updateUserController,
} from "../_controllers/users.controllers";

const userRouter: Router = Router();

userRouter.post("", createUserController);
userRouter.get("", retrieveUsersController);
userRouter.get("/:id", retrieveUserController);
userRouter.patch("/:id", updateUserController);
userRouter.delete("/:id", deleteUserController);

export default userRouter;
