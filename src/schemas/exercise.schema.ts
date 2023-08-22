import { z } from "zod";

export const exercise = z.object({
  id: z.string().uuid(),
  name: z.string(),
  reps: z.number(),
  effort: z.number(),
  load: z.number(),
  rest: z.number(),
  link: z.number(),
});
