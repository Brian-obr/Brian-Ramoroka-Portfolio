export interface Experience {
  title: string;
  company: string;
  where: string;
  dates: string;
  intro: string;
  groups: { heading?: string; bullets: string[] }[];
}

export interface FormState {
  status: "idle" | "submitting" | "success" | "error";
  message: string;
  errors: Record<string, string>;
}
