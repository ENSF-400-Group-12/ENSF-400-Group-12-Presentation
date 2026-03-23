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
    "Production-ready flow with demo seeding for fast onboarding and full end-to-end testing.",
  ] as const,
  rightHeading: "F-1 to F-5",
  bullets: [
    "F-1 · Auth: signup, login, logout, protected routes.",
    "F-2 · Wardrobe: uploads, CRUD, search/filters, optional demo wardrobe (/api/demo seed).",
    "F-3 · Outfits: generate from saved items; explanation, regenerate; optional OpenAI rerank when env allows.",
    "F-4 · Favourites: save and manage go-to looks for quick reuse.",
    "F-5 · Context: richer inputs (e.g. weather) and OpenAI-powered metadata support for better recommendations.",
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
    "F-4 · Favourites: save and manage your best outfit combinations for quick reuse.",
  f5:
    "F-5 · Context + AI: weather-aware context and OpenAI-powered metadata/rerank support improve recommendation quality.",
} as const;

export const slide05 = {
  kicker: "Stack",
  title: "Structure & tech",
  columns: [
    {
      heading: "Client",
      lines: [
        "React 19, React Router 6, CRA, JS + CSS",
        "Production frontend: Vercel; dev uses setupProxy to the API",
      ],
    },
    {
      heading: "Server",
      lines: [
        "Express 5, express-session, cookie-backed auth, multer multipart uploads",
        "Production API: Railway (Node service, CORS + cookies with the Vercel origin)",
        "OpenAI SDK when configured: item image assist, optional outfit rerank (OPENAI_OUTFIT_RERANK)",
      ],
    },
    {
      heading: "Data",
      lines: [
        "sql.js / SQLite file (backend/data/app.db) and uploads locally",
        "Production: Railway persistent volume for the DB file and uploaded images",
      ],
    },
  ],
  footer:
    "Core outfit scoring stays in Node (inspectable rules). OpenAI is optional for photos and reranking. Deployed: Vercel (frontend) + Railway (backend + volume). Workflow: feature branches, PRs, reviews on the A4 repo.",
  pills: [
    "React",
    "Express",
    "sql.js",
    "OpenAI",
    "Vercel",
    "Railway",
    "Sessions",
    "Git / PRs",
  ],
} as const;

export const slide06 = {
  kicker: "Showcase",
  title: "Live demo",
  centerTitle: "ClosetAI: live walkthrough",
  demoUrl: "https://joinclosetai.com",
} as const;

export const slide07 = {
  kicker: GROUP_LABEL,
  title: "Project management",
  leftBlocks: [
    {
      heading: "Challenges",
      bullets: [
        "Sequencing a full SRS: we shipped auth, wardrobe, and outfits first, then layered favourites and richer context once the core path was stable.",
        "Integration risk: sessions, uploads, sql.js file DB, CRA setupProxy, and later Vercel + Railway env (CORS, cookies, volume paths) had to stay aligned across the team.",
        "Communication load: parallel client and server work meant API shapes needed quick, shared updates before integration weeks.",
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
