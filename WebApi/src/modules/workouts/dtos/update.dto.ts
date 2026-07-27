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

export const Update = z.object({
  name: z.string().trim().min(1).optional(),
  weekDay: z.number().int().min(0).max(6).optional(),
  // quando enviado, substitui todos os exercícios/séries do treino.
  // quando omitido, os exercícios/séries atuais são mantidos como estão.
  exercises: z.array(ExerciseInput).optional(),
});

export type UpdateDto = z.output<typeof Update>;
