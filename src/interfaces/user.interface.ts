import { z } from "zod";
import { user } from "../schemas";

export type User = z.infer<typeof user>