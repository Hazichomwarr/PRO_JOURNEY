import { z } from "zod";

export const CreateMessageSchema = z.object({
  content: z
    .string()
    .min(1, "Message cannot be empty")
    .max(500, "Message is too long"),
});
