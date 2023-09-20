import { Router } from "express";
import { createSessionController, reactiveAccountController } from "../_controllers/session.controller";

export const sessionRouter = Router()

sessionRouter.post("", createSessionController)
sessionRouter.patch("/reactive", reactiveAccountController)