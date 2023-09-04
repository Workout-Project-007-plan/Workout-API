import { z } from "zod";
import { userSchema, userSignUp } from "../schemas";
import { DeepPartial } from "typeorm";
import {
  userAdmin,
  userLogin,
  userReturnedSchema,
  usersGet,
} from "../schemas/user.schema";

export type TUserCreated = z.infer<typeof userSchema>;

export type TUserReturnedCreated = z.infer<typeof userReturnedSchema>;

export type TUserSignUp = z.infer<typeof userSignUp>;

export type TUserAdmin = z.infer<typeof userAdmin>;

export type TUserLogin = z.infer<typeof userLogin>;

export type TGetUsers = z.infer<typeof usersGet>;

export type TUserUpdate = DeepPartial<TUserSignUp>;
