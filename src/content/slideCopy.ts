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
  leftHeading: "At a glance",
  summaryBullets: [
    "Wardrobe in the browser: save items, then generate outfits only from what you own.",
    "Readable explanations on results; dashboard-first flow (occasion + vibe, not weather-first).",
    "Stack: React, React Router, Express, sessions, SQLite (sql.js), local image files.",
  ] as const,
  rightHeading: "F-1 to F-5",
  bullets: [
    "F-1 · Auth: signup, login, logout, protected routes.",
    "F-2 · Wardrobe: uploads, CRUD, search/filters, optional demo wardrobe.",
    "F-3 · Outfits: generate from saved items; explain + regenerate.",
    "F-4 · Favourites: save and manage go-to looks.",
    "F-5 · Context: richer inputs when needed (e.g. weather); optional OpenAI for vision/metadata where wired.",
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
  f4:
    "F-4 · Favourites: save and manage go-to looks so strong outfits stay one click away.",
  f5:
    "F-5 · Context: richer inputs when needed (e.g. weather); optional OpenAI assists where wired, same dashboard-first flow.",
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
      lines: [
        "Express, session auth, multipart image uploads",
        "OpenAI API where we use AI for vision or metadata assists",
      ],
    },
    {
      heading: "Data",
      lines: ["sql.js / SQLite (backend/data/app.db)", "Local image storage alongside metadata"],
    },
  ],
  footer:
    "Core outfit generation stays local and inspectable. Optional paths use OpenAI for lightweight vision or metadata help, aligned with the SRS. A4: feature branches, PRs, reviewed merges, clear commits.",
  pills: ["React", "Express", "SQLite", "OpenAI", "Sessions", "Git / PRs"],
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
