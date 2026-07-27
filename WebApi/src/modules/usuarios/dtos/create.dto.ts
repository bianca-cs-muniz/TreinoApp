import { z } from "zod";

const GOALS = ["EMAGRECER", "GANHAR_MASSA", "MANTER", "CONDICIONAMENTO"] as const;

export const Create = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  password: z.string().min(6),
  goal: z.enum(GOALS).optional(),
  age: z.number().int().positive().optional(),
  weightKg: z.number().positive().optional(),
  heightCm: z.number().positive().optional(),
});

export type createDto = z.output<typeof Create>;
