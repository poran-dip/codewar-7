export const THEMES = [
  "Healthcare",
  "EdTech",
  "FinTech",
  "Fitness",
  "Sustainability",
  "E-Gov",
] as const;
export type Theme = (typeof THEMES)[number];

export interface ProblemStatement {
  id: string;
  theme: Theme;
  title: string;
  description: string;
}
