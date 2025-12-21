import { z } from "zod";

export const PaginationSchema = z.object({
  limit: z.coerce.number().int().min(1).max(50).default(3),
  cursor: z.string().optional(),
});
