import { Router } from "express";
import { sendMailController } from "../_controllers/passwordRecoverControllers/sendMail.controller";

export const mailRouter = Router();

mailRouter.post("", sendMailController);
