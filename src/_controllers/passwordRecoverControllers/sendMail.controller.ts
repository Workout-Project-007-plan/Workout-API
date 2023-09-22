import { Request, Response } from "express";
import { sendMailservice } from "../../_services/passwordRecoverServices/sendMail.service";

export const sendMailController = async (req: Request, res: Response) => {
  const to = req.body.email;

  const sendMailResponse = await sendMailservice(to);

  return res.status(200).json(sendMailResponse);
};
