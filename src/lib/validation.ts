import { z } from "zod";

export const enquiryTypes = ["project", "hiring"] as const;
export type EnquiryType = (typeof enquiryTypes)[number];

export const contactFormSchema = z.object({
  type: z.enum(enquiryTypes, { message: "Choose hiring or project" }),
  name: z.string().trim().min(2, "Please enter your name").max(100, "Name must be 100 characters or less"),
  email: z.string().trim().email("Please enter a valid email address"),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be 2000 characters or less"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
