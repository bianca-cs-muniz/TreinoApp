import { z } from "zod";

export const Finish = z.object({
  durationSec: z.number().int().nonnegative(),
  comment: z.string().trim().max(500).optional(),
});

export type FinishDto = z.output<typeof Finish>;
