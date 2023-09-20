import dataSource from "../data-source";
import { User } from "../entities/users.entity";
import AppError from "../errors";
import { TUserLogin } from "../interfaces/user.interface";
import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";

export const createSessionService = async ({
  email,
  password,
}: TUserLogin): Promise<string> => {
  const userRepository = dataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: { email: email },
    withDeleted: true,
  });

  if (!user) {
    throw new AppError("User or password invalid", 401);
  }

  if (user.is_active === false) {
    throw new AppError("User invalid", 401);
  }

  const passwordMatch = await compare(password, user.password);
  if (!passwordMatch) {
    throw new AppError("User or password invalid", 401);
  }

  const token = jwt.sign(
    {
      isActive: user.is_active,
      isAdm: user.is_adm,
    },
    process.env.SECRET_KEY!,
    {
      subject: user.id,
      expiresIn: "24h",
    }
  );
  return token;
};

export const reactiveAccountService = async (email: string): Promise<void> => {
  const userRepository = dataSource.getRepository(User);
  const userToReactive = await userRepository
    .createQueryBuilder("user")
    .where("user.email = :email", { email: email })
    .withDeleted()
    .getOne();

  if (!userToReactive) {
    throw new AppError("User not found, try again with new information", 404);
  }

  if (userToReactive.is_active) {
    throw new AppError("This user is already reactivated", 401);
  }

  userToReactive.is_active = true;
  userToReactive.deleted_at = null;

  await userRepository.save(userToReactive);
};
