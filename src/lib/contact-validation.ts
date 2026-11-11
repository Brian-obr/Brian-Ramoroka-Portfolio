/**
 * Client-side mirror of `contactFormSchema` messages (kept out of the zod module so the
 * browser bundle doesn't include zod; it cost /contact ~60 KB of JS). The server still
 * validates every submission with `contactFormSchema`.
 */
export function validateContactForm(data: { name: string; email: string; message: string }) {
  const errors: Record<string, string> = {};
  const name = data.name.trim();
  if (name.length < 2) errors.name = "Please enter your name";
  else if (name.length > 100) errors.name = "Name must be 100 characters or less";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) errors.email = "Please enter a valid email";
  const message = data.message.trim();
  if (message.length < 10) errors.message = "Message must be at least 10 characters";
  else if (message.length > 2000) errors.message = "Message must be 2000 characters or less";
  return errors;
}
