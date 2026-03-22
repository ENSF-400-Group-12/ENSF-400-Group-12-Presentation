import { COURSE_LINE, GROUP_LABEL, TEAM_MEMBERS } from "../content/team";
import { TAGLINE } from "../content/project";
import type { SlideRenderer } from "../components/PresentationDeck";

function SlideHeader(props: {
  kicker: string;
  title: string;
  showMark?: boolean;
}) {
  return (
    <header className="slide-header">
      <div>
        <p className="slide-header__kicker">{props.kicker}</p>
        <h1 className="slide-header__title">{props.title}</h1>
      </div>
      {props.showMark !== false ? (
        <img
          className="slide-header__mark"
          src="/brand/closetai-square.png"
          alt=""
          decoding="async"
        />
      ) : null}
    </header>
  );
}

function Slide01Title(): JSX.Element {
  return (
    <div className="title-slide">
      <img
        className="title-slide__logo"
        src="/brand/closetai-horizontal.png"
        alt="ClosetAI"
        decoding="async"
      />
      <p className="title-slide__tagline">{TAGLINE}</p>
      <div className="title-slide__footer">
        <span>{COURSE_LINE}</span>
        <span className="title-slide__dot" aria-hidden />
        <span>{GROUP_LABEL}</span>
      </div>
    </div>
  );
}

function Slide02Team(): JSX.Element {
  return (
    <div className="slide">
      <SlideHeader kicker={GROUP_LABEL} title="Team" />
      <div className="team-grid">
        {TEAM_MEMBERS.map((m) => (
          <article key={m.ucid} className="team-card">
            <h2 className="team-card__name">{m.name}</h2>
            {m.role ? <p className="team-card__role">{m.role}</p> : null}
            <p className="team-card__ucid">UCID {m.ucid}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function Slide03Description(): JSX.Element {
  return (
    <div className="slide">
      <SlideHeader kicker="SRS (A1)" title="Scope & requirements" />
      <div className="grid-2">
        <div className="prose">
          <p>
            <strong>ClosetAI</strong> is a web app for digitizing clothes, managing a
            personal wardrobe, and generating outfits from items the user already
            owns, with explanations they can read and trust.
          </p>
        </div>
        <div>
          <p className="slide-header__kicker" style={{ marginBottom: "0.5rem" }}>
            Requirements (F-1–F-5)
          </p>
          <ul className="list">
            <li>
              <strong>F-1</strong> Accounts: signup, login, logout, protected routes.
            </li>
            <li>
              <strong>F-2</strong> Wardrobe: uploads, CRUD, search, filters.
            </li>
            <li>
              <strong>F-3</strong> Outfits: generate from saved items + explanations
              (prototype: local rule-based engine; LLM optional later per SRS).
            </li>
            <li>
              <strong>F-4 / F-5</strong> Favourites &amp; extra context (e.g. weather):
              medium priority; out of scope for today&apos;s core demo.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function Slide04Features(): JSX.Element {
  return (
    <div className="slide">
      <SlideHeader kicker="Assignment 4" title="What we built" />
      <div className="card-grid card-grid--3">
        <article className="card">
          <p className="card__label">F-1</p>
          <h2 className="card__title">Accounts</h2>
          <p className="card__body">
            Private wardrobe per user: auth before any data, aligned with the SRS
            landing-to-dashboard flow.
          </p>
        </article>
        <article className="card">
          <p className="card__label">F-2</p>
          <h2 className="card__title">Wardrobe</h2>
          <p className="card__body">
            Image-first intake, CRUD, search/filters, data that survives restarts.
          </p>
        </article>
        <article className="card">
          <p className="card__label">F-3</p>
          <h2 className="card__title">Outfits</h2>
          <p className="card__body">
            Occasion + vibe in; outfits from your closet out, with rationale and
            regenerate.
          </p>
        </article>
      </div>
    </div>
  );
}

function Slide05Architecture(): JSX.Element {
  return (
    <div className="slide">
      <SlideHeader kicker="Stack" title="Structure & tech" />
      <div className="arch arch--spaced">
        <div className="arch__node">
          <h3>Client</h3>
          <ul>
            <li>React, React Router, JS, global CSS</li>
            <li>Dev proxy (setupProxy)</li>
          </ul>
        </div>
        <div className="arch__arrow" aria-hidden>
          →
        </div>
        <div className="arch__node">
          <h3>Server</h3>
          <ul>
            <li>Express, session auth</li>
            <li>Multipart image uploads</li>
          </ul>
        </div>
        <div className="arch__arrow" aria-hidden>
          →
        </div>
        <div className="arch__node">
          <h3>Data</h3>
          <ul>
            <li>sql.js / SQLite (<code>backend/data/app.db</code>)</li>
            <li>Local image files (no cloud in v1)</li>
          </ul>
        </div>
      </div>
      <p className="prose--compact">
        Rule-based generator runs locally (no API keys for class demos). SRS still
        allows LLM/weather later. <strong>A4:</strong> feature branches, PRs,
        reviewed merges, clear commits.
      </p>
      <div className="pill-row" aria-label="Technology tags">
        {["React", "Express", "SQLite", "Sessions", "Git / PRs"].map((t) => (
          <span key={t} className="pill">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function Slide06Demo(): JSX.Element {
  return (
    <div className="slide">
      <SlideHeader kicker="Showcase" title="Live demo" />
      <div className="demo-placeholder">
        <img
          className="demo-placeholder__logo"
          src="/brand/ClosetAI-logo-transparent.png"
          alt=""
          decoding="async"
        />
        <p className="demo-placeholder__title">ClosetAI: live walkthrough</p>
      </div>
    </div>
  );
}

function Slide07Reflection(): JSX.Element {
  return (
    <div className="slide">
      <SlideHeader kicker={GROUP_LABEL} title="Project management" />
      <div className="grid-2">
        <div>
          <div className="reflection-block">
            <h3>Challenges</h3>
            <ul>
              <li>
                Scoping SRS extras (LLM, weather) vs shipping a solid local core on
                time.
              </li>
              <li>
                Full-stack glue: sessions, uploads, DB, proxy across laptops.
              </li>
              <li>Keeping acceptance criteria shared while work ran in parallel.</li>
            </ul>
          </div>
          <div className="reflection-block">
            <h3>What we used from class</h3>
            <ul>
              <li>
                <strong>A2 WBS</strong> for packages and ownership.
              </li>
              <li>
                <strong>A3</strong> schedule, dependencies, critical path.
              </li>
              <li>
                <strong>A4</strong> Git: branches, PRs, required reviews.
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div className="reflection-block">
            <h3>Next time</h3>
            <p>
              Earlier shared API examples and short decision notes after scope
              discussions, so fewer surprises late in the term.
            </p>
          </div>
          <div className="reflection-block">
            <h3>Reviews</h3>
            <p>
              PR comments on behavior and security (auth, uploads); sync for
              blockers, async for the rest.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export const SLIDE_RENDERERS: SlideRenderer[] = [
  () => <Slide01Title />,
  () => <Slide02Team />,
  () => <Slide03Description />,
  () => <Slide04Features />,
  () => <Slide05Architecture />,
  () => <Slide06Demo />,
  () => <Slide07Reflection />,
];
