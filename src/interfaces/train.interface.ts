import { z } from "zod";
import { train } from "../schemas/train.schema";
import { DeepPartial } from "typeorm";

export type TTrainCreate = z.infer<typeof train>;

export type TTrainUpdate = DeepPartial<TTrainCreate>;
