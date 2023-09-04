import {Router} from "express"
import { createUserController, retrieveUserController, retrieveUsersController } from "../_controllers/users.controllers"

const userRouter: Router = Router()

userRouter.post("", createUserController)
userRouter.get("", retrieveUsersController)
userRouter.get("/:id", retrieveUserController)
userRouter.patch("/:id", )
userRouter.delete("/:id", )


export default userRouter