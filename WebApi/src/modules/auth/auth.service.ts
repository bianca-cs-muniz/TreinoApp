import bcrypt from "bcryptjs";
import Repository from "./auth.repository";
import { loginDto } from "./dtos/login.dto";
import { signToken } from "../../utils/jwt";
import AppException from "@errors/app-exception";
import ErrorMessages from "@errors/error-messages";

class Service {
  public async login(data: loginDto) {
    const user = await Repository.findByEmail(data.email);
    if (!user) {
      throw new AppException(401, ErrorMessages.INVALID_CREDENTIALS);
    }

    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid) {
      throw new AppException(401, ErrorMessages.INVALID_CREDENTIALS);
    }

    const token = signToken(user.id);
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        goal: user.goal,
        age: user.age,
        weightKg: user.weightKg,
        heightCm: user.heightCm,
      },
      token,
    };
  }
}

export default new Service();
