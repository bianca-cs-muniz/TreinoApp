import jwt from "jsonwebtoken";

const JWT_ALGORITHM = "HS256";

export function signToken(userId: string) {
  return jwt.sign({ userId }, process.env.JWT_SECRET as string, { expiresIn: "7d", algorithm: JWT_ALGORITHM });
}

export function verifyToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET as string, { algorithms: [JWT_ALGORITHM] }) as { userId: string };
}
