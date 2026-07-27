import bcrypt from "bcryptjs";
import Repository from "./usuarios.repository";
import { createDto } from "./dtos/create.dto";
import { UpdateDto } from "./dtos/update.dto";
import { signToken } from "../../utils/jwt";
import AppException from "@errors/app-exception";
import ErrorMessages from "@errors/error-messages";

class Service {
  public async create(data: createDto) {
    const existing = await Repository.findByEmail(data.email);
    if (existing) {
      throw new AppException(409, ErrorMessages.ACCOUNT_ALREADY_EXISTS);
    }

    const hashed = await bcrypt.hash(data.password, 10);
    const user = await Repository.create({ ...data, password: hashed });
    const token = signToken(user.id);

    return { user, token };
  }

  private async readById(id: string) {
    const user = await Repository.readById(id);
    if (!user) {
      throw new AppException(404, ErrorMessages.USER_NOT_FOUND);
    }
    return user;
  }

  public async update(id: string, userId: string, data: UpdateDto) {
    await this.readById(id);
    if (id !== userId) {
      throw new AppException(403, ErrorMessages.FORBIDDEN);
    }
    return await Repository.update(id, data);
  }

  public async delete(id: string, userId: string) {
    await this.readById(id);
    if (id !== userId) {
      throw new AppException(403, ErrorMessages.FORBIDDEN);
    }
    return await Repository.delete(id);
  }
}

export default new Service();
