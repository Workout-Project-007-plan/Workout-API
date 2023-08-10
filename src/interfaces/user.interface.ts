import { z } from "zod";
import { user, userSignUp } from "../schemas";

export type TUserCreated = z.infer<typeof user>

export type TUserSignUp = z.infer<typeof userSignUp>