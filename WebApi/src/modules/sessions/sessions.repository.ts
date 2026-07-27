import { prisma } from "@database/data-source";
import { UpdateSetLogDto } from "./dtos/update-set-log.dto";

const SESSION_INCLUDE = {
  setLogs: {
    include: { set: true },
  },
};

class Repository {
  private readonly repository;

  constructor() {
    this.repository = prisma.workoutSession;
  }

  public findWorkoutWithSets(workoutId: string) {
    return prisma.workout.findUnique({
      where: { id: workoutId },
      include: { exercises: { include: { sets: true } } },
    });
  }

  public create(userId: string, workoutId: string, setIds: string[]) {
    return this.repository.create({
      data: {
        userId,
        workoutId,
        setLogs: {
          create: setIds.map((setId) => ({ setId })),
        },
      },
      include: SESSION_INCLUDE,
    });
  }

  public findById(id: string) {
    return this.repository.findUnique({
      where: { id },
      include: SESSION_INCLUDE,
    });
  }

  public updateSetLog(setLogId: string, data: UpdateSetLogDto) {
    return prisma.setLog.update({
      where: { id: setLogId },
      data: {
        ...data,
        completedAt: data.completed ? new Date() : undefined,
      },
    });
  }

  public finish(id: string, durationSec: number, comment?: string) {
    return this.repository.update({
      where: { id },
      data: { finishedAt: new Date(), durationSec, comment },
    });
  }

  public findActiveByUser(userId: string) {
    return this.repository.findFirst({
      where: { userId, finishedAt: null },
      include: {
        ...SESSION_INCLUDE,
        workout: { select: { name: true } },
      },
      orderBy: { startedAt: "desc" },
    });
  }

  public findFinishedByUser(userId: string) {
    return this.repository.findMany({
      where: { userId, finishedAt: { not: null } },
      select: {
        id: true,
        workoutId: true,
        startedAt: true,
        finishedAt: true,
        durationSec: true,
        comment: true,
        workout: { select: { name: true } },
      },
      orderBy: { startedAt: "desc" },
    });
  }
}

export default new Repository();
