import { prisma } from "@database/data-source";

class Repository {
  private readonly repository;

  constructor() {
    this.repository = prisma.user;
  }

  public findByEmail(email: string) {
    return this.repository.findUnique({ where: { email } });
  }
}

export default new Repository();
