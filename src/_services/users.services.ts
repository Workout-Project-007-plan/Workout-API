import dataSource from "../data-source";
import { User } from "../entities/users.entity";
import AppError from "../errors";
import {
  TUserReturnedCreated,
  TUserSignUp,
} from "../interfaces/user.interface";
import { userReturnedSchema } from "../schemas/user.schema";

export const createUserService = async (
  userData: TUserSignUp
): Promise<TUserReturnedCreated> => {
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

  const userResponse = userReturnedSchema.parse(newUser);

  return userResponse;
};

export const retrieveUserService = async (
  userId: string
): Promise<TUserReturnedCreated> => {
  const userRepository = dataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({ id: userId });

  if (!findUser) {
    throw new AppError("User not found, try again with new information", 404);
  }

  const userResponse = userReturnedSchema.parse(findUser);

  return userResponse;

};
