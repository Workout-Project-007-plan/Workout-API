import { z } from "zod";
import { trainResponse, trainCreate } from "../schemas/train.schema";
import { DeepPartial } from "typeorm";

export type TTrainCreate = z.infer<typeof trainCreate>;
export type TTrainResponse = z.infer<typeof trainResponse>;
export type TTrainUpdate = DeepPartial<TTrainCreate>;
