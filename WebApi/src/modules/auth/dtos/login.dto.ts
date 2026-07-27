import { z } from "zod";

export const Login = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
});

export type loginDto = z.output<typeof Login>;
