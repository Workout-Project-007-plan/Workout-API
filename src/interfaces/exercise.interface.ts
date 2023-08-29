import { z } from "zod";
import { exercise } from "../schemas/exercise.schema";
import { DeepPartial } from "typeorm";

export type TExercise = z.infer<typeof exercise>;

export type TExerciseUpdate = DeepPartial<TExercise>;
