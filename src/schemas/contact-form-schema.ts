import { z } from "zod";

export const contactSchema = z.object({
  fullName: z.string().trim().min(1, "This field is required"),

  email: z
    .email("Please enter a valid email address")
    .min(1, "This field is required"),

  message: z
    .string()
    .trim()
    .min(1, "This field is required")
    .min(10, "Message should be at least 10 characters long"),

 termsAgreement: z
  .boolean()
  .refine((val) => val === true, {
    message: "You must accept the terms to continue",
  }),
});

export type ContactFormDataType = z.infer<typeof contactSchema>;