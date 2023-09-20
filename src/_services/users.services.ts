import dataSource from "../data-source";
import { User } from "../entities/users.entity";
import AppError from "../errors";
import {
  TGetUsers,
  TUserReturnedCreated,
  TUserSignUp,
  TUserUpdate,
} from "../interfaces/user.interface";
import {
  userReturnedSchema,
  userUpdate,
  usersGet,
} from "../schemas/user.schema";

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

export const retrieveOwnProfileService = async (
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

export const retrieveUsersService = async (): Promise<TGetUsers> => {
  const userRepository = dataSource.getRepository(User);

  const findUsers = await userRepository.find({ withDeleted: true });

  if (!findUsers) {
    throw new AppError("Users not found, try again with new information", 404);
  }

  const usersResponse = usersGet.parse(findUsers);

  return usersResponse;
};

export const updateUserService = async (
  userId: string,
  newData: TUserUpdate
) => {
  const userRepository = dataSource.getRepository(User);

  const foundUser = await userRepository.findOneBy({ id: userId });

  if (!foundUser) {
    throw new AppError("User not found, try again with new information", 404);
  }

  const nUserData = userRepository.create({
    ...foundUser,
    ...newData,
  });

  await userRepository.save(nUserData);

  const usersResponse = userUpdate.parse(nUserData);

  return usersResponse;
};

export const deleteUserService = async (userId: string): Promise<void> => {
  const userRepository = dataSource.getRepository(User);

  const userToDelete = await userRepository.findOneBy({ id: userId });

  if (!userToDelete) {
    throw new AppError("User not found, try again with new information", 404);
  }

  userToDelete.is_active = false;

  await userRepository.save(userToDelete);

  await userRepository.softRemove(userToDelete);
};
