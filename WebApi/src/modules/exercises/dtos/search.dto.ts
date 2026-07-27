import { z } from "zod";

export const Search = z.object({
  term: z.string().trim().min(2),
});

export type SearchDto = z.output<typeof Search>;
