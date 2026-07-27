import { z } from "zod";

export const RequestPath = z.object({
  id: z.string().min(1),
});
