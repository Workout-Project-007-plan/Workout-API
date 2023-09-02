import { z } from "zod";

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  password: z.string().min(6),
  admin: z.boolean().default(() => false),
  is_active: z.boolean().default(() => true),
  name: z.string().min(3),
  gender: z.string().min(3),
  height: z.number().max(4),
  age: z.number().max(3),
  weight: z.number().max(5),
  weight_goal: z.number().max(5),
  created_at: z.date(),
  updated_at: z.date(),
  deleted_at: z.date(),
  password_reset_token: z.string(),
  password_reseted_at: z.date(),
});

export const userLogin = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const userAdmin = userSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
  deleted_at: true,
  is_active: true,
  password_reset_token: true,
  password_reseted_at: true,
});
export const userSignUp = userSchema.omit({
  id: true,
  admin: true,
  created_at: true,
  updated_at: true,
  deleted_at: true,
  is_active: true,
  password_reset_token: true,
  password_reseted_at: true,
});

export const usersGet = userSchema.array();

export const userUpdate = userSignUp.partial();
