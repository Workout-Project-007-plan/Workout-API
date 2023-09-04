import {Router} from "express"
import { createUserController, retrieveUserController } from "../_controllers/users.controllers"

const userRouter: Router = Router()

userRouter.post("", createUserController)
userRouter.get("/:id", retrieveUserController)
userRouter.get("", )
userRouter.patch("/:id", )
userRouter.delete("/:id", )


export default userRouter