import { z } from "zod";

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email("Invalid E-mail format"),
  password: z.string().min(6, "Password need to be 6 characters").max(6),
  admin: z.boolean().default(() => false),
  is_active: z.boolean().default(() => true),
  name: z.string().min(3),
  gender: z.string().min(3).max(10),
  height: z.number().max(4),
  age: z.number().max(120),
  weight: z.number().max(250),
  weight_goal: z.number().max(150),
  created_at: z.string().or(z.date()),
  updated_at: z.string().or(z.date()),
  deleted_at: z.string().or(z.date()).nullable(),
  password_reset_token: z.string().nullable(),
  password_reseted_at: z.string().nullable(),
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

export const userReturnedSchema = userSchema.extend({
  // incluir plano de treino
}).omit({ password: true });

export const usersGet = userReturnedSchema.array();

export const userUpdate = userReturnedSchema.partial();
