import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  retrieveUserController,
  retrieveUsersController,
  updateUserController,
} from "../_controllers/users.controllers";
import { validFieldsMiddleware } from "../middlewares/validFields.middleware";
import { userSignUp } from "../schemas";
import { signUpFieldsMiddleware } from "../middlewares/signUpFields.middleware";
import { updateDataMiddleware } from "../middlewares/updateData.middleware";

const userRouter: Router = Router();

userRouter.post(
  "",
  signUpFieldsMiddleware,
  validFieldsMiddleware(userSignUp),
  createUserController
);
userRouter.get("", retrieveUsersController);
userRouter.get("/:id", retrieveUserController);
userRouter.patch("/:id", updateDataMiddleware, updateUserController);
userRouter.delete("/:id", deleteUserController);

export default userRouter;
