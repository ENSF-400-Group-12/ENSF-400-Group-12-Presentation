import { COURSE_LINE, GROUP_LABEL } from "./team";
import { TAGLINE } from "./project";

/** Single source for web deck, PPTX, and PDF exports. */
export const slide01Title = {
  tagline: TAGLINE,
  /** Footer segments (dot separator rendered between each). */
  footerParts: [COURSE_LINE, GROUP_LABEL] as const,
} as const;

export const slide03 = {
  kicker: "SRS (A1)",
  title: "Scope & requirements",
  leftParagraphs: [
    "ClosetAI is a web app for digitizing clothes, managing a personal wardrobe, and generating outfits from items the user already owns, with explanations they can read and trust.",
  ],
  rightHeading: "Requirements (F-1–F-5)",
  bullets: [
    "F-1 Accounts: signup, login, logout, protected routes.",
    "F-2 Wardrobe: uploads, CRUD, search, filters.",
    "F-3 Outfits: generate from saved items with explanations; rule-based engine in product, with optional LLM support described in the SRS.",
    "F-4 Outfit management: save, view, and manage favourite looks so users can build a library of go-to combinations.",
    "F-5 Context-aware generation: occasion plus richer signals (e.g. weather) to tighten recommendations when users want more precision.",
  ],
} as const;

export const slide04 = {
  kicker: "Product",
  title: "Main features",
  cards: [
    {
      label: "F-1",
      title: "Accounts",
      body: "Private wardrobe per user: auth before any data, aligned with the SRS landing-to-dashboard flow.",
    },
    {
      label: "F-2",
      title: "Wardrobe",
      body: "Image-first intake, CRUD, search/filters, data that survives restarts.",
    },
    {
      label: "F-3",
      title: "Outfits",
      body: "Occasion + vibe in; outfits from your closet out, with rationale and regenerate.",
    },
  ],
  footer:
    "F-4 favourites and F-5 richer context (e.g. weather) complete the SRS picture and extend the same dashboard-first experience.",
} as const;

export const slide05 = {
  kicker: "Stack",
  title: "Structure & tech",
  columns: [
    {
      heading: "Client",
      lines: ["React, React Router, JS, global CSS", "Dev proxy (setupProxy)"],
    },
    {
      heading: "Server",
      lines: ["Express, session auth", "Multipart image uploads"],
    },
    {
      heading: "Data",
      lines: ["sql.js / SQLite (backend/data/app.db)", "Local image storage alongside metadata"],
    },
  ],
  footer:
    "Outfit logic runs locally for fast, inspectable behavior; the SRS also describes optional LLM and contextual inputs alongside F-5. A4: feature branches, PRs, reviewed merges, clear commits.",
  pills: ["React", "Express", "SQLite", "Sessions", "Git / PRs"],
} as const;

export const slide06 = {
  kicker: "Showcase",
  title: "Live demo",
  centerTitle: "ClosetAI: live walkthrough",
} as const;

export const slide07 = {
  kicker: GROUP_LABEL,
  title: "Project management",
  leftBlocks: [
    {
      heading: "Challenges",
      bullets: [
        "Sequencing a full SRS: stable auth, wardrobe, and outfit flows first, then layering favourites and contextual generation without blocking the team.",
        "Full-stack glue: sessions, uploads, DB, proxy across laptops.",
        "Keeping acceptance criteria shared while work ran in parallel.",
      ],
    },
    {
      heading: "What we used from class",
      bullets: [
        "A2 WBS for packages and ownership.",
        "A3 schedule, dependencies, critical path.",
        "A4 Git: branches, PRs, required reviews.",
      ],
    },
  ],
  rightBlocks: [
    {
      heading: "Next time",
      paragraph:
        "Earlier shared API examples and short decision notes after scope discussions, so fewer surprises late in the term.",
    },
    {
      heading: "Reviews",
      paragraph:
        "PR comments on behavior and security (auth, uploads); sync for blockers, async for the rest.",
    },
  ],
} as const;
