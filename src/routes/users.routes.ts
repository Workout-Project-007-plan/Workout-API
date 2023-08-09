import {Router} from "express"
import { createUserController } from "../_controllers/users.controllers"

const userRouter: Router = Router()

userRouter.post("", createUserController)
userRouter.get("", )
userRouter.get("/:id", )
userRouter.patch("/:id", )
userRouter.delete("/:id", )


export default userRouter