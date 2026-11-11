import { z } from "zod";

// Single-line fields end up in the notification email, so no control characters (CR, LF, etc).
const NO_CONTROL_CHARS = /^[^\p{Cc}]*$/u;

const singleLine = (label: string) =>
  z
    .string()
    .trim()
    .max(100, `${label} must be 100 characters or less`)
    .regex(NO_CONTROL_CHARS, `${label} can't contain line breaks or control characters`);

export const contactFormSchema = z.object({
  name: singleLine("Name").min(2, "Please enter your name"),
  email: z
    .string()
    .trim()
    .max(254, "Email must be 254 characters or less")
    .email("Please enter a valid email"),
  company: singleLine("Company").optional(),
  role: singleLine("Role").optional(),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be 2000 characters or less"),
  // Honeypot: accept any string; checked manually in the route handler before this schema runs
  website: z.string().optional(),
});
