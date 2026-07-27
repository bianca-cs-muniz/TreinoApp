import Repository from "./workouts.repository";
import { createDto } from "./dtos/create.dto";
import { UpdateDto } from "./dtos/update.dto";
import AppException from "@errors/app-exception";
import ErrorMessages from "@errors/error-messages";

class Service {
  public async findAllByUser(userId: string) {
    return await Repository.findAllByUser(userId);
  }

  public async findById(id: string, userId: string) {
    const workout = await Repository.findById(id);
    if (!workout || workout.userId !== userId || !workout.active) {
      throw new AppException(404, ErrorMessages.WORKOUT_NOT_FOUND);
    }
    return workout;
  }

  public async create(userId: string, data: createDto) {
    return await Repository.create(userId, data);
  }

  public async update(id: string, userId: string, data: UpdateDto) {
    await this.findById(id, userId);
    return await Repository.update(id, data);
  }

  public async delete(id: string, userId: string) {
    await this.findById(id, userId);
    return await Repository.delete(id);
  }
}

export default new Service();
