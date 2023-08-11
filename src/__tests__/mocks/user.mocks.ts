import { TUserAdmin, TUserSignUp } from "../../interfaces/user.interface";

export const mockUserSignUpData: TUserSignUp = {
  name: "John Doe",
  email: "doe.john@mail.com",
  password: "123456",
  height: 178,
  age: 28,
  weight: 70,
  weight_goal: 80,
};

export const mockWrongUserSignUpData = {
  name: "John Doe",
  email: "doe.john@mail.com",
};
export const mockWrongUserMailData = {
  name: "John Doe",
  email: "doe.johnmail",
};

export const mockUserAdminSignUpData: TUserAdmin = {
  name: "John Doe",
  email: "doe.john@mail.com",
  password: "123456",
  height: 178,
  age: 28,
  weight: 70,
  weight_goal: 80,
  admin: true,
};
