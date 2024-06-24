import { z } from "zod";

export const applicationSchema = z.object({
  companyName: z
    .string()
    .min(1, { message: "Company name must be at least 1 character long" }),
  position: z
    .string()
    .min(1, { message: "Position must be at least 1 character long" }),
  status: z
    .string()
    .min(1, { message: "Status must be at least 1 character long" }),
  dateApplied: z.date(),
});
