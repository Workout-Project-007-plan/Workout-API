import { Router } from "express";
import { createSessionController } from "../_controllers/session.controller";

export const sessionRouter = Router()

sessionRouter.post("", createSessionController)