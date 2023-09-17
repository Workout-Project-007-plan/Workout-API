import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  retrieveOwnProfileController,
  retrieveUserController,
  retrieveUsersController,
  updateUserController,
} from "../_controllers/users.controllers";
import { validFieldsMiddleware } from "../middlewares/validFields.middleware";
import { userSignUp } from "../schemas";
import { signUpFieldsMiddleware } from "../middlewares/signUpFields.middleware";
import { updateDataMiddleware } from "../middlewares/updateData.middleware";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";

const userRouter: Router = Router();

userRouter.post(
  "",
  signUpFieldsMiddleware,
  validFieldsMiddleware(userSignUp),
  createUserController
);
userRouter.get("", ensureAuthMiddleware, retrieveUsersController);
userRouter.get("/profile", ensureAuthMiddleware, retrieveOwnProfileController);
userRouter.get("/:id", ensureAuthMiddleware, retrieveUserController);
userRouter.patch("/:id", ensureAuthMiddleware, updateDataMiddleware, updateUserController);
userRouter.delete("/:id", ensureAuthMiddleware, deleteUserController);

export default userRouter;
