import { z } from "zod";
import { user, userSignUp } from "../schemas";
import { DeepPartial } from "typeorm";
import { User } from "../entities/users.entity";

export type TUserCreated = z.infer<typeof user>

export type TUserSignUp = z.infer<typeof userSignUp>

export type TUserUpdate = DeepPartial<TUserSignUp>

export type TUserRead = Array<User>