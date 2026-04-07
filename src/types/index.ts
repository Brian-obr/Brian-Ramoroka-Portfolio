export interface Project {
  slug: string;
  title: string;
  category: string;
  year: string;
  tech: string[];
  liveUrl: string;
  thumbnail: string;
  order: number;
  content: string;
}

export interface Experience {
  title: string;
  company: string;
  dates: string;
  description: string;
  bullets: string[];
  projects?: string[]; // slugs linking to portfolio projects
}

export interface Language {
  name: string;
  proficiency: string;
  barWidth: number; // 0–100
}

export interface Education {
  institution: string;
  credential: string;
  date: string;
}

export interface Skill {
  name: string;
}

export interface FormState {
  status: "idle" | "submitting" | "success" | "error";
  message: string;
  errors: Record<string, string>;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export interface SkillGroup {
  name: string;
  skills: string[];
}

export interface Service {
  number: string;
  title: string;
  description: string;
}

export interface Market {
  flag: string;
  name: string;
  scope: string;
}
