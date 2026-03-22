/** Devicon SVGs (MIT) — centered strip under Structure & tech title. */
const DEVICON_BASE =
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

export type TechStripItem = { id: string; label: string; path: string };

export const TECH_STRIP_ITEMS: readonly TechStripItem[] = [
  { id: "js", label: "JavaScript", path: "javascript/javascript-original.svg" },
  { id: "react", label: "React", path: "react/react-original.svg" },
  { id: "html", label: "HTML5", path: "html5/html5-original.svg" },
  { id: "css", label: "CSS3", path: "css3/css3-original.svg" },
  { id: "node", label: "Node.js", path: "nodejs/nodejs-original.svg" },
  { id: "express", label: "Express", path: "express/express-original.svg" },
  { id: "sqlite", label: "SQLite", path: "sqlite/sqlite-original.svg" },
  { id: "git", label: "Git", path: "git/git-original.svg" },
] as const;

export function techIconSrc(iconPath: string): string {
  return `${DEVICON_BASE}/${iconPath}`;
}
