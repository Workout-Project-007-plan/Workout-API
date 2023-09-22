import dataSource from "../../data-source";
import { User } from "../../entities/users.entity";
import AppError from "../../errors";
import jwt from "jsonwebtoken";

export const recoverPinService = async (recoverPin: string) => {
  const userRepository = dataSource.getRepository(User);
  const foundUser = await userRepository.findOneBy({
    password_reset_token: recoverPin,
  });

  if (!foundUser) {
    throw new AppError("User not found", 404);
  }

  const userEmail = foundUser.email;

  const token = jwt.sign(
    {
      isActive: foundUser.is_active,
      isAdm: foundUser.is_adm,
    },
    process.env.SECRET_KEY!,
    {
      subject: foundUser.id,
      expiresIn: "10min",
    }
  );

  foundUser.password_reset_token = null
  await userRepository.save(foundUser)

  return { token: token, email: userEmail };
};
