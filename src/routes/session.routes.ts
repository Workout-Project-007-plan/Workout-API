import { Router } from "express";
import { createSessionController, reactiveAccountController } from "../_controllers/session.controller";
import { recoverPinController } from "../_controllers/passwordRecoverControllers/recoverPin.controller";

export const sessionRouter = Router()

sessionRouter.post("", createSessionController)
sessionRouter.patch("/reactive", reactiveAccountController)
sessionRouter.post("/pincode", recoverPinController)