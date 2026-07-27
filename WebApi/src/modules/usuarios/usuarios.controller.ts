import { Request, Response } from "express";
import Service from "./usuarios.service";
import { TryCatch } from "@decorators/try-catch.decorator";
import { AuthRequest } from "../../middlewares/authMiddleware";
import { createDto } from "./dtos/create.dto";
import { UpdateDto } from "./dtos/update.dto";

class Controller {
  @TryCatch()
  public async create(req: Request, res: Response) {
    const result = await Service.create(req.body as createDto);
    res.status(201).json(result);
  }

  @TryCatch()
  public async update(req: AuthRequest, res: Response) {
    const result = await Service.update(req.params.id, req.userId as string, req.body as UpdateDto);
    res.status(200).json(result);
  }

  @TryCatch()
  public async delete(req: AuthRequest, res: Response) {
    const result = await Service.delete(req.params.id, req.userId as string);
    res.status(200).json(result);
  }
}

export default new Controller();
