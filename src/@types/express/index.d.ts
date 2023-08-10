import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user: {
        // chaves a serem incluídas na interface global
      };
    }
  }
}
