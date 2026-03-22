/** Devicon SVGs (MIT) + Simple Icons (CC0) for OpenAI — tech strip under Structure & tech. */
const DEVICON_BASE =
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

/** Simple Icons package SVG (single-color, works with ink filter). */
const OPENAI_ICON_SRC =
  "https://cdn.jsdelivr.net/npm/simple-icons@11.6.0/icons/openai.svg";

export type TechStripItem =
  | { id: string; label: string; devicon: string }
  | { id: string; label: string; src: string };

export const TECH_STRIP_ITEMS: readonly TechStripItem[] = [
  { id: "js", label: "JavaScript", devicon: "javascript/javascript-original.svg" },
  { id: "react", label: "React", devicon: "react/react-original.svg" },
  { id: "html", label: "HTML5", devicon: "html5/html5-original.svg" },
  { id: "css", label: "CSS3", devicon: "css3/css3-original.svg" },
  { id: "node", label: "Node.js", devicon: "nodejs/nodejs-original.svg" },
  { id: "express", label: "Express", devicon: "express/express-original.svg" },
  { id: "sqlite", label: "SQLite", devicon: "sqlite/sqlite-original.svg" },
  { id: "openai", label: "GPT-4o mini", src: OPENAI_ICON_SRC },
  { id: "git", label: "Git", devicon: "git/git-original.svg" },
] as const;

export function techStripItemSrc(item: TechStripItem): string {
  if ("src" in item) return item.src;
  return `${DEVICON_BASE}/${item.devicon}`;
}
