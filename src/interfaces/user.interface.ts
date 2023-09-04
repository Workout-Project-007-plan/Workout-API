import { z } from "zod";
import { userSchema, userSignUp } from "../schemas";
import { DeepPartial } from "typeorm";
import { userAdmin, userLogin, userReturnedSchema } from "../schemas/user.schema";

export type TUserCreated = z.infer<typeof userSchema>

export type TUserReturnedCreated = z.infer<typeof userReturnedSchema>

export type TUserSignUp = z.infer<typeof userSignUp>

export type TUserAdmin = z.infer<typeof userAdmin>

export type TUserLogin = z.infer<typeof userLogin>

export type TUserUpdate = DeepPartial<TUserSignUp>