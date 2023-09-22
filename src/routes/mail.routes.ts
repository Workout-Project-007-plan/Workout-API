import { Router } from "express";
import { sendMailController } from "../_controllers/passwordRecoverControllers/sendMail.controller";
import { validFieldsMiddleware } from "../middlewares/validFields.middleware";
import { recoverPass } from "../schemas/user.schema";

export const mailRouter = Router();

mailRouter.post("", validFieldsMiddleware(recoverPass), sendMailController);
