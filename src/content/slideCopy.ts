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
    "ClosetAI helps users digitize a personal wardrobe and generate outfit ideas from clothes they already own, with explanations they can read on the results screen. The product is dashboard-first: minimal navigation, emphasis on wardrobe imagery, and a flow built around occasion and style or vibe rather than a weather-first wizard.",
    "The implementation pairs a React client (React Router, global CSS, local dev proxy) with an Express server: session-based auth, multipart image uploads, and SQLite via sql.js so metadata and images persist under backend data paths without cloud storage in the current build.",
  ],
  leftBullets: [
    "Problem: closets are hard to keep organized; choosing outfits repeats the same mental work; manual tagging for every garment does not scale.",
    "Approach: image-first intake, full wardrobe CRUD with search and filters, and a local rule-based outfit engine that only uses the logged-in user's saved items.",
  ] as const,
  rightHeading: "Functional requirements (F-1 to F-5)",
  bullets: [
    "F-1 Accounts: signup, login, logout; protected routes; branded auth shell consistent with the SRS landing-to-dashboard story.",
    "F-2 Digital wardrobe: add, edit, delete items; search and filters; local image storage; demo wardrobe path for showings and testing.",
    "F-3 Outfit generation: occasion and vibe inputs; protected generate endpoint; results show selected items, explanation, and regenerate; handles an insufficient wardrobe gracefully.",
    "F-4 Outfit management: save, browse, and manage favourite looks so users build a reusable library of combinations (extends the same dashboard experience described in the SRS).",
    "F-5 Context-aware generation: occasion plus richer signals (for example weather) when users want tighter recommendations; optional LLM-assisted metadata and reranking described in the SRS as extensions to the core flows.",
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
