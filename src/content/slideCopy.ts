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
  title: "Project description & requirements",
  leftHeading: "At a glance",
  summaryBullets: [
    "Wardrobe in the browser: save items, then generate outfits only from what you own.",
    "Readable explanations on results; dashboard-first flow (occasion + vibe, not weather-first).",
    "Stack: React 19, React Router 6, CRA + setupProxy, Express 5, express-session, sql.js file DB (backend/data/app.db), multer uploads (backend/uploads).",
  ] as const,
  rightHeading: "F-1 to F-5",
  bullets: [
    "F-1 · Auth: signup, login, logout, protected routes.",
    "F-2 · Wardrobe: uploads, CRUD, search/filters, optional demo wardrobe (/api/demo seed).",
    "F-3 · Outfits: generate from saved items; explanation, regenerate; optional OpenAI rerank when env allows.",
    "F-4 · Favourites: in SRS; /favorites route is a placeholder (coming soon), not persisted in this build.",
    "F-5 · Context: richer inputs (e.g. weather) in SRS scope; not in current UI. OpenAI used for item photo assist and optional outfit rerank.",
  ],
} as const;

export const slide04 = {
  kicker: "Product",
  title: "Main features (implemented)",
  cards: [
    {
      label: "F-1",
      title: "Accounts",
      body: "Keeps closets private: signup, login, logout, and session-gated API routes so users only see their own wardrobe data.",
    },
    {
      label: "F-2",
      title: "Wardrobe",
      body: "Digitizes what you own: image uploads, metadata, CRUD, filters, optional demo seed, sql.js + files so data survives restarts.",
    },
    {
      label: "F-3",
      title: "Outfits",
      body: "Solves what to wear from that closet: occasion + vibe in, local scoring with readable rationale, regenerate; optional OpenAI rerank between candidates when enabled.",
    },
  ],
  f4:
    "F-4 · Favourites (SRS, not shipped): saved-outfit library is planned; the app shows a placeholder page, no save API yet.",
  f5:
    "F-5 · Context (SRS): weather-style inputs are future scope. Today, OpenAI supports item metadata from photos and optional outfit reranking.",
} as const;

export const slide05 = {
  kicker: "Stack",
  title: "Structure & tech",
  columns: [
    {
      heading: "Client",
      lines: ["React 19, React Router 6, CRA, JS + CSS", "setupProxy to backend during development"],
    },
    {
      heading: "Server",
      lines: [
        "Express 5, express-session, cookie-backed auth, multer multipart uploads",
        "OpenAI SDK when configured: item image assist, optional outfit rerank (OPENAI_OUTFIT_RERANK)",
      ],
    },
    {
      heading: "Data",
      lines: ["sql.js / SQLite (backend/data/app.db)", "Local image storage alongside metadata"],
    },
  ],
  footer:
    "Core outfit scoring and picking stay in Node (inspectable rules). OpenAI is optional for item photos and reranking top candidates. Workflow: feature branches, PRs, reviews, clear commits on the A4 repo.",
  pills: ["React", "Express", "sql.js", "OpenAI", "Sessions", "Git / PRs"],
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
        "Sequencing a full SRS: ship auth, wardrobe, and outfit flows first; favourites and richer context stay scoped but unfinished without blocking the rest.",
        "Integration risk: sessions, uploads, sql.js file DB, and CRA setupProxy had to match across machines and branches.",
        "Communication load: parallel client and server work without always sharing the latest API contract until hook-up time.",
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
      heading: "Next time (communication)",
      paragraph:
        "Post agreed examples of request and response shapes right after scope changes, so integration is boring. Set clearer norms for when to meet live versus async chat, and a short path to resolve disagreements before they stall merges.",
    },
    {
      heading: "Code feedback",
      paragraph:
        "GitHub pull requests with required review: comments on behavior, auth, and uploads; quick sync when blocked, otherwise async review. Same habit as A4: small PRs, explicit reviewers, fix before merge.",
    },
  ],
} as const;
