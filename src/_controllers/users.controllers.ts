import { Request, Response } from "express";

export const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.json("Deu bom");
};


