
import {
  TUserAdmin,
  TUserLogin,
  TUserSignUp,
  TUserUpdate,
} from "../../interfaces/user.interface";

export const mockUserSignUpData: TUserSignUp = {
  name: "John Doe",
  email: "doe.john@mail.com",
  password: "123456",
  gender: "male",
  height: 178,
  age: 28,
  weight: 70,
  weight_goal: 80,
};

export const mockUserUpdateData: TUserUpdate = {
  name: "New John",
  email: "new.john@mail.com",
  password: "654321",
  height: 175,
  age: 30,
  weight: 74,
  weight_goal: 82,
};

export const mockUserAdminSignUpData: TUserAdmin = {
  name: "John Doe",
  email: "doe.admin@mail.com",
  password: "123456",
  gender: "male",
  height: 178,
  age: 28,
  weight: 70,
  weight_goal: 80,
  admin: true,
};

export const mockUserLoginData: TUserLogin = {
  email: "doe.john@mail.com",
  password: "123456",
};
export const mockAdminLoginData: TUserLogin = {
  email: "doe.admin@mail.com",
  password: "123456",
};

export const mockWrongUserSignUpData = {
  name: "John Doe",
  email: "doe.john@mail.com",
};
export const mockWrongUserMailData = {
  name: "John Doe",
  email: "doe.johnmail",
};
