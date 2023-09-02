import { z } from "zod";
import { userSchema, userSignUp } from "../schemas";
import { DeepPartial } from "typeorm";
import { User } from "../entities/users.entity";
import { userAdmin, userLogin } from "../schemas/user.schema";

export type TUserCreated = z.infer<typeof userSchema>

export type TUserSignUp = z.infer<typeof userSignUp>

export type TUserAdmin = z.infer<typeof userAdmin>

export type TUserLogin = z.infer<typeof userLogin>

export type TUserUpdate = DeepPartial<TUserSignUp>

export type TUserRead = Array<User>