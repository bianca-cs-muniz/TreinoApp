import { prisma } from "@database/data-source";
import { createDto } from "./dtos/create.dto";
import { UpdateDto } from "./dtos/update.dto";

const SAFE_SELECT = {
  id: true,
  email: true,
  name: true,
  goal: true,
  age: true,
  weightKg: true,
  heightCm: true,
};

class Repository {
  private readonly repository;

  constructor() {
    this.repository = prisma.user;
  }

  public readById(id: string) {
    return this.repository.findUnique({
      where: { id },
      select: SAFE_SELECT,
    });
  }

  public findByEmail(email: string) {
    return this.repository.findUnique({ where: { email } });
  }

  public create(data: createDto) {
    return this.repository.create({
      data,
      select: SAFE_SELECT,
    });
  }

  public update(id: string, data: UpdateDto) {
    return this.repository.update({
      where: { id },
      data,
      select: SAFE_SELECT,
    });
  }

  public delete(id: string) {
    return this.repository.delete({
      where: { id },
      select: SAFE_SELECT,
    });
  }
}

export default new Repository();
