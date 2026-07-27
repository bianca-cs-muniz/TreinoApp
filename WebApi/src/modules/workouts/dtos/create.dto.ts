import { z } from "zod";

const SetInput = z.object({
  weightKg: z.number().positive().optional(),
  reps: z.number().int().positive().optional(),
  durationSec: z.number().int().positive().optional(),
});

const ExerciseInput = z.object({
  name: z.string().trim().min(1),
  externalApiId: z.string().optional(),
  restSec: z.number().int().nonnegative().optional(),
  sets: z.array(SetInput).default([]),
});

export const Create = z.object({
  name: z.string().trim().min(1),
  weekDay: z.number().int().min(0).max(6).optional(),
  exercises: z.array(ExerciseInput).default([]),
});

export type createDto = z.output<typeof Create>;
