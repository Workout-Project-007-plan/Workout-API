import { z } from "zod";

export const train = z.object({
  id: z.string().uuid(),
  name: z.string(),
  status: z.string(),
});

export const trainsSerie = train.array()