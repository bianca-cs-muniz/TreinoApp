import Repository from "./sessions.repository";
import { UpdateSetLogDto } from "./dtos/update-set-log.dto";
import AppException from "@errors/app-exception";
import ErrorMessages from "@errors/error-messages";

class Service {
  public async start(workoutId: string, userId: string) {
    const workout = await Repository.findWorkoutWithSets(workoutId);
    if (!workout || workout.userId !== userId || !workout.active) {
      throw new AppException(404, ErrorMessages.WORKOUT_NOT_FOUND);
    }

    const active = await Repository.findActiveByUser(userId);
    if (active) {
      throw new AppException(409, ErrorMessages.SESSION_ALREADY_ACTIVE);
    }

    const setIds = workout.exercises.flatMap((ex) => ex.sets.map((s) => s.id));
    return await Repository.create(userId, workoutId, setIds);
  }

  public async findActive(userId: string) {
    return await Repository.findActiveByUser(userId);
  }

  public async findById(id: string, userId: string) {
    const session = await Repository.findById(id);
    if (!session || session.userId !== userId) {
      throw new AppException(404, ErrorMessages.SESSION_NOT_FOUND);
    }
    return session;
  }

  public async updateSetLog(sessionId: string, setLogId: string, userId: string, data: UpdateSetLogDto) {
    const session = await this.findById(sessionId, userId);
    if (!session.setLogs.some((log) => log.id === setLogId)) {
      throw new AppException(404, ErrorMessages.SESSION_NOT_FOUND);
    }
    return await Repository.updateSetLog(setLogId, data);
  }

  public async finish(sessionId: string, userId: string, durationSec: number, comment?: string) {
    await this.findById(sessionId, userId);
    return await Repository.finish(sessionId, durationSec, comment);
  }

  public async listFinished(userId: string) {
    return await Repository.findFinishedByUser(userId);
  }
}

export default new Service();
