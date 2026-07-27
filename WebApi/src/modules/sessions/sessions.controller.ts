import { Response } from "express";
import Service from "./sessions.service";
import { TryCatch } from "@decorators/try-catch.decorator";
import { AuthRequest } from "../../middlewares/authMiddleware";
import { UpdateSetLogDto } from "./dtos/update-set-log.dto";
import { FinishDto } from "./dtos/finish.dto";

class Controller {
  @TryCatch()
  public async start(req: AuthRequest, res: Response) {
    const result = await Service.start(req.params.workoutId, req.userId as string);
    res.status(201).json(result);
  }

  @TryCatch()
  public async updateSetLog(req: AuthRequest, res: Response) {
    const result = await Service.updateSetLog(
      req.params.sessionId,
      req.params.setLogId,
      req.userId as string,
      req.body as UpdateSetLogDto
    );
    res.status(200).json(result);
  }

  @TryCatch()
  public async finish(req: AuthRequest, res: Response) {
    const { durationSec, comment } = req.body as FinishDto;
    const result = await Service.finish(req.params.sessionId, req.userId as string, durationSec, comment);
    res.status(200).json(result);
  }

  @TryCatch()
  public async listFinished(req: AuthRequest, res: Response) {
    const result = await Service.listFinished(req.userId as string);
    res.status(200).json(result);
  }

  @TryCatch()
  public async findActive(req: AuthRequest, res: Response) {
    const result = await Service.findActive(req.userId as string);
    res.status(200).json(result);
  }
}

export default new Controller();
