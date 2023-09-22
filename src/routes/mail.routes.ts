import { Router } from "express";
import { sendMailController } from "../_controllers/sendMail.controller";


export const mailRouter = Router()

mailRouter.post("", sendMailController)