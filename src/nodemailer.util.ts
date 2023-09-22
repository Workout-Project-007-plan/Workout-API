import { createTransport } from "nodemailer";
import { IEmailRequest } from "./interfaces/email.interface";
import "dotenv/config";
import AppError from "./errors";

export const sendEmail = async ({ subject, text, to }: IEmailRequest): Promise<void> => {
  const transporter = createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: to,
    subject: subject,
    html: text,
  }).then(() => {
    console.log("E-mail send with success")
  }).catch((err) => {
    console.log(err)
    throw new AppError("Error sending e-mail, try again later")
  });
};
