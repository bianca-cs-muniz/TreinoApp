import { Request, Response } from "express";
import Service from "./exercises.service";
import { TryCatch } from "@decorators/try-catch.decorator";
import { SearchDto } from "./dtos/search.dto";

class Controller {
  @TryCatch()
  public async search(req: Request, res: Response) {
    const { term } = req.query as unknown as SearchDto;
    const result = await Service.search(term);
    res.status(200).json(result);
  }

  @TryCatch()
  public async getById(req: Request, res: Response) {
    const result = await Service.getById(req.params.id);
    res.status(200).json(result);
  }
}

export default new Controller();
