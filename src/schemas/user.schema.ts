import { z } from "zod";

export const user = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  password: z.string().min(6),
  admin: z.boolean().default(() => false),
  is_active: z.boolean().default(() => true),
  name: z.string().min(3),
  height: z.number().max(4),
  age: z.number().max(3),
  weigth: z.number().max(5),
  weigth_goal: z.number().max(5),
  created_at: z.date(),
  updated_at: z.date(),
  deleted_at: z.date(),
  password_reset_token: z.string(),
  password_reseted_at: z.date(),
});

export const userSignUp = user.omit({
  id: true,
  admin: true,
  created_at: true,
  updated_at: true,
  deleted_at: true,
  password_reset_token: true,
  password_reseted_at: true,
});

export const usersGet = user.array();

export const userUpdate = userSignUp.partial()