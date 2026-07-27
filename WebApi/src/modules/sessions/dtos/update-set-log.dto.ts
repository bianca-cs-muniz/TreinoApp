import { z } from "zod";

export const UpdateSetLog = z.object({
  completed: z.boolean().optional(),
  weightKg: z.number().positive().optional(),
  reps: z.number().int().positive().optional(),
  durationSec: z.number().int().positive().optional(),
});

export type UpdateSetLogDto = z.output<typeof UpdateSetLog>;
