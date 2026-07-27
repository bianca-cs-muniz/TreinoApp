import { Request, Response } from "express";
import Service from "./auth.service";
import { TryCatch } from "@decorators/try-catch.decorator";
import { loginDto } from "./dtos/login.dto";

class Controller {
  @TryCatch()
  public async login(req: Request, res: Response) {
    const result = await Service.login(req.body as loginDto);
    res.status(200).json(result);
  }
}

export default new Controller();
