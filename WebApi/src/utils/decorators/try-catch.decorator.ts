import AppException from "@errors/app-exception";
import { NextFunction, Request, Response } from "express";

export function TryCatch() {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
      try {
        await originalMethod.call(this, req, res, next);
      } catch (err: any) {
        if (err instanceof AppException) {
          next(err);
          return;
        }
        // erro inesperado (bug, ORM, etc.) — não repassa a mensagem interna pro cliente.
        console.error(err);
        next(new AppException(500, "Erro interno"));
      }
    };

    return descriptor;
  };
}
