import { z } from "zod";
import { exercise } from "./exercise.schema";

export const train = z.object({
  id: z.string().uuid(),
  name: z.string(),
  status: z.string(),
  exercise: exercise.array(),
});

export const trainsSerie = train.array();
