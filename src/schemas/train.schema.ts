import { z } from "zod";
import { exercise } from "./exercise.schema";

export const trainResponse = z.object({
  id: z.string().uuid(),
  name: z.string(),
  status: z.boolean(),
  exercises: exercise.array(),
});

export const trainCreate = trainResponse.omit({
  id: true,
});

export const trainsSerie = trainResponse.array();
