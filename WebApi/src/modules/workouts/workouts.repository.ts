import { prisma } from "@database/data-source";
import { createDto } from "./dtos/create.dto";
import { UpdateDto } from "./dtos/update.dto";

const WORKOUT_INCLUDE = {
  exercises: {
    include: { sets: { orderBy: { order: "asc" as const } } },
    orderBy: { order: "asc" as const },
  },
};

class Repository {
  private readonly repository;

  constructor() {
    this.repository = prisma.workout;
  }

  public findAllByUser(userId: string) {
    return this.repository.findMany({
      where: { userId, active: true },
      include: WORKOUT_INCLUDE,
      orderBy: [{ weekDay: { sort: "asc", nulls: "last" } }, { createdAt: "asc" }],
    });
  }

  public findById(id: string) {
    return this.repository.findUnique({
      where: { id },
      include: WORKOUT_INCLUDE,
    });
  }

  public create(userId: string, data: createDto) {
    return this.repository.create({
      data: {
        name: data.name,
        weekDay: data.weekDay,
        userId,
        exercises: {
          create: data.exercises.map((ex, order) => ({
            name: ex.name,
            externalApiId: ex.externalApiId,
            restSec: ex.restSec,
            order,
            sets: {
              create: ex.sets.map((s, setOrder) => ({ ...s, order: setOrder })),
            },
          })),
        },
      },
      include: WORKOUT_INCLUDE,
    });
  }

  public update(id: string, data: UpdateDto) {
    return this.repository.update({
      where: { id },
      data: {
        name: data.name,
        weekDay: data.weekDay,
        ...(data.exercises && {
          exercises: {
            deleteMany: {},
            create: data.exercises.map((ex, order) => ({
              name: ex.name,
              externalApiId: ex.externalApiId,
              restSec: ex.restSec,
              order,
              sets: {
                create: ex.sets.map((s, setOrder) => ({ ...s, order: setOrder })),
              },
            })),
          },
        }),
      },
      include: WORKOUT_INCLUDE,
    });
  }

  // "excluir" só inativa o treino — preserva as sessões/histórico já registrados.
  public delete(id: string) {
    return this.repository.update({ where: { id }, data: { active: false } });
  }
}

export default new Repository();
