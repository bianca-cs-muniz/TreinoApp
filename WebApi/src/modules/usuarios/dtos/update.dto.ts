import { z } from "zod";

const GOALS = ["EMAGRECER", "GANHAR_MASSA", "MANTER", "CONDICIONAMENTO"] as const;

export const Update = z.object({
  name: z.string().trim().min(1).optional(),
  goal: z.enum(GOALS).optional(),
  age: z.number().int().positive().optional(),
  weightKg: z.number().positive().optional(),
  heightCm: z.number().positive().optional(),
});

export type UpdateDto = z.output<typeof Update>;
