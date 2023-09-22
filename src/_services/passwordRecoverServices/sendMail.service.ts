import dataSource from "../../data-source";
import { User } from "../../entities/users.entity";
import AppError from "../../errors";
import { sendEmail } from "../../nodemailer.util";

export const sendMailservice = async ( to:string) => {
    
  const userRepository = dataSource.getRepository(User);
  const userExist = await userRepository.findOneBy({ email: to });

  if (!userExist) {
    return {
      message:
        "If we find this e-mail address on our database an e-mail will be sent...",
    };
  }
  const subject = `Aqui está seu código de recuperaçãode senha, ${userExist.name}`;

  const recoverCode = Math.round(Math.random() * 1000000);

  const text = `Por favor digite o código: ${recoverCode} para recuperar sua senha`;

  const date = new Date()
     
  const dateFormatted = date.toLocaleString("pt-BR", {
       timeZone: "America/Sao_Paulo",
       hour12: false,
       year: "numeric",
       month: "2-digit",
       day: "2-digit",
       hour: "2-digit",
       minute: "2-digit",
       second: "2-digit"
     });


  userExist.password_reset_token = String(recoverCode)
  userExist.password_reseted_at = dateFormatted

  await userRepository.save(userExist)
  try {
    await sendEmail({ subject, text, to });
    return {
      message:
        "If we find this e-mail address on our database an e-mail will be sent.",
    };
  } catch (error) {
    if (error instanceof Error) {
        throw new AppError(error.message, 400)
    }
  }
};
