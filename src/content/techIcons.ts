/**
 * Simple Icons (CC0) — single-path marks that read clearly as ink on the slide.
 * https://github.com/simple-icons/simple-icons
 */
const SI_VER = "11.6.0";
const SI_BASE = `https://cdn.jsdelivr.net/npm/simple-icons@${SI_VER}/icons`;

export type TechStripItem = {
  id: string;
  label: string;
  /** Simple Icons filename without .svg */
  slug: string;
};

export const TECH_STRIP_ITEMS: readonly TechStripItem[] = [
  { id: "js", label: "JavaScript", slug: "javascript" },
  { id: "react", label: "React", slug: "react" },
  { id: "html", label: "HTML5", slug: "html5" },
  { id: "css", label: "CSS3", slug: "css3" },
  { id: "node", label: "Node.js", slug: "nodedotjs" },
  { id: "express", label: "Express", slug: "express" },
  { id: "sqlite", label: "SQLite", slug: "sqlite" },
  { id: "openai", label: "OpenAI", slug: "openai" },
  { id: "git", label: "Git", slug: "git" },
] as const;

export function techStripItemSrc(item: TechStripItem): string {
  return `${SI_BASE}/${item.slug}.svg`;
}
