import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Please enter your name")
    .max(100, "Name must be 100 characters or less"),
  email: z.string().email("Please enter a valid email"),
  projectType: z
    .enum(["Web Development", "SEO", "Web App", "App Development", "Software Engineering", "Maintenance & Support", "Hiring / Team Role", "Other"])
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be 2000 characters or less"),
  // Honeypot: accept any string — checked manually in route handler before this schema runs
  website: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
