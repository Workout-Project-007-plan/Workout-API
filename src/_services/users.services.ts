import dataSource from "../data-source";
import { User } from "../entities/users.entity";
import AppError from "../errors";
import { TUserCreated, TUserSignUp } from "../interfaces/user.interface";
import { userSchema } from "../schemas/user.schema";

export const createUserService = async (
  userData: TUserSignUp
): Promise<TUserCreated> => {
  const userRepository = dataSource.getRepository(User);

  const userExist = await userRepository.findOneBy({ email: userData.email });

  if (userExist) {
    throw new AppError(
      "User already exist, try again with new informations",
      409
    );
  }
  const newUser = userRepository.create(userData);
  await userRepository.save(newUser);

  const userResponse = userSchema.parse(newUser);

  return userResponse
};
