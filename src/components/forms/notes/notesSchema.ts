import { z } from "zod";

export const notesSchema = z.object({
  note: z
    .string()
    .min(1, { message: "Note must be at least 1 character long" }),
});
