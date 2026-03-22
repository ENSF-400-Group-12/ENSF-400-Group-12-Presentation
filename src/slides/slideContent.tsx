import { lazy, Suspense, useState, type JSX } from "react";
import { GROUP_LABEL, HERO_TOP_LINE, TEAM_MEMBERS } from "../content/team";
import {
  slide01Title,
  slide03,
  slide04,
  slide05,
  slide06,
  slide07,
} from "../content/slideCopy";
import { TECH_STRIP_ITEMS, techStripItemSrc } from "../content/techIcons";
import type { SlideRenderer } from "../components/PresentationDeck";

const HeroMannequinGLB = lazy(() =>
  import("../components/HeroMannequinGLB").then((m) => ({
    default: m.HeroMannequinGLB,
  }))
);

const BRAND_DOOR = "/brand/ClosetAI-logo-transparent.png";
const BRAND_WORD = "/brand/ClosetAI-transparent.png";
const BRAND_FALLBACK = "/brand/closetai-horizontal.png";

function BrandLogoLockup(): JSX.Element {
  const [wordFailed, setWordFailed] = useState(false);
  if (wordFailed) {
    return (
      <div className="hero-brand">
        <img
          className="hero-brand__door"
          src={BRAND_DOOR}
          alt=""
          decoding="async"
        />
        <img
          className="hero-brand__wordmark"
          src={BRAND_FALLBACK}
          alt="ClosetAI"
          decoding="async"
        />
      </div>
    );
  }
  return (
    <div className="hero-brand">
      <img
        className="hero-brand__door"
        src={BRAND_DOOR}
        alt=""
        decoding="async"
      />
      <img
        className="hero-brand__wordmark"
        src={BRAND_WORD}
        alt="ClosetAI"
        decoding="async"
        onError={() => setWordFailed(true)}
      />
    </div>
  );
}

function ShellHeader(props: {
  kicker: string;
  title: string;
  showMark?: boolean;
}) {
  return (
    <header className="shell-header">
      <div>
        <p className="shell-header__kicker">{props.kicker}</p>
        <h1 className="shell-header__title">{props.title}</h1>
      </div>
      {props.showMark !== false ? (
        <img
          className="shell-header__mark shell-header__mark--door"
          src="/brand/ClosetAI-logo-transparent.png"
          alt=""
          decoding="async"
        />
      ) : null}
    </header>
  );
}

function Slide01Hero(): JSX.Element {
  return (
    <div className="slide-shell slide-shell--hero">
      <div className="hero-layout">
        <div className="hero-layout__copy">
          <p className="hero-kicker">{HERO_TOP_LINE}</p>
          <BrandLogoLockup />
          <p className="hero-tagline">{slide01Title.tagline}</p>
          <div className="hero-rule" aria-hidden />
          <div className="hero-footer">
            {slide01Title.footerParts.flatMap((part, i) =>
              i < slide01Title.footerParts.length - 1
                ? [
                    <span key={part}>{part}</span>,
                    <span
                      key={`d${i}`}
                      className="hero-footer__dot"
                      aria-hidden
                    />,
                  ]
                : [<span key={part}>{part}</span>]
            )}
          </div>
        </div>
        <div className="hero-layout__viewer">
          <Suspense fallback={<div className="hero-fallback" aria-hidden />}>
            <HeroMannequinGLB />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

function Slide02Team(): JSX.Element {
  return (
    <div className="slide-shell slide-shell--team">
      <ShellHeader kicker={GROUP_LABEL} title="Team" />
      <div className="team-slide">
        <div className="team-slide__cluster">
          <div className="team-slide__row">
            {TEAM_MEMBERS.map((m) => (
              <article key={m.ucid} className="team-card">
                <h2 className="team-card__name">{m.name}</h2>
                {m.role ? <p className="team-card__role">{m.role}</p> : null}
                <p className="team-card__ucid">UCID {m.ucid}</p>
              </article>
            ))}
          </div>
          <img
            className="team-slide__accent team-slide__accent--fullbleed"
            src="/brand/below-team.png"
            alt=""
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
}

function Slide03Description(): JSX.Element {
  return (
    <div className="slide-shell">
      <ShellHeader kicker={slide03.kicker} title={slide03.title} />
      <div className="grid-2 grid-2--scope">
        <div>
          <p className="shell-header__kicker scope-col-heading">
            {slide03.leftHeading}
          </p>
          <ul className="scope-tight-bullets">
            {slide03.summaryBullets.map((b) => (
              <li key={b.slice(0, 40)}>{b}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="shell-header__kicker scope-col-heading">
            {slide03.rightHeading}
          </p>
          <ul className="list list--scope-compact">
            {slide03.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function TechIconStrip(): JSX.Element {
  return (
    <div className="tech-icon-strip" role="list" aria-label="Technologies used">
      {TECH_STRIP_ITEMS.map((item) => (
        <div key={item.id} className="tech-icon-strip__item" role="listitem">
          <img
            className="tech-icon-strip__img"
            src={techStripItemSrc(item)}
            alt=""
            title={item.label}
            loading="lazy"
            decoding="async"
          />
          <span className="tech-icon-strip__label">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

function Slide04Features(): JSX.Element {
  return (
    <div className="slide-shell slide-shell--features">
      <ShellHeader kicker={slide04.kicker} title={slide04.title} />
      <div className="features-layout">
        <div className="features-layout__media">
          <img
            className="features-layout__img"
            src="/brand/closetai-tailor.png"
            alt=""
            decoding="async"
          />
        </div>
        <div className="features-layout__f123">
          {slide04.cards.map((c) => (
            <div key={c.label} className="features-feat">
              <p className="features-feat__label">{c.label}</p>
              <h3 className="features-feat__title">{c.title}</h3>
              <p className="features-feat__body">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="features-layout__lower">
        <p className="features-feat__body features-feat__body--lower">
          {slide04.f4}
        </p>
        <p className="features-feat__body features-feat__body--lower">
          {slide04.f5}
        </p>
      </div>
    </div>
  );
}

function Slide05Architecture(): JSX.Element {
  return (
    <div className="slide-shell slide-shell--stack">
      <ShellHeader kicker={slide05.kicker} title={slide05.title} />
      <TechIconStrip />
      <div className="arch arch--spaced">
        {slide05.columns.map((col, i) => (
          <div key={col.heading} style={{ display: "contents" }}>
            <div className="arch__node">
              <h3>{col.heading}</h3>
              <ul>
                {col.lines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
            {i < slide05.columns.length - 1 ? (
              <div className="arch__arrow" aria-hidden>
                →
              </div>
            ) : null}
          </div>
        ))}
      </div>
      <p className="prose--compact">{slide05.footer}</p>
      <div className="pill-row" aria-label="Technology tags">
        {slide05.pills.map((t) => (
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
    <div className="slide-shell slide-shell--demo">
      <ShellHeader kicker={slide06.kicker} title={slide06.title} />
      <div className="demo-placeholder">
        <img
          className="demo-placeholder__logo"
          src="/brand/ClosetAI-logo-transparent.png"
          alt=""
          decoding="async"
        />
        <p className="demo-placeholder__title">{slide06.centerTitle}</p>
      </div>
    </div>
  );
}

function Slide07Reflection(): JSX.Element {
  return (
    <div className="slide-shell slide-shell--pm">
      <ShellHeader kicker={slide07.kicker} title={slide07.title} />
      <div className="grid-2">
        <div>
          {slide07.leftBlocks.map((block) => (
            <div key={block.heading} className="reflection-block">
              <h3>{block.heading}</h3>
              <ul>
                {block.bullets.map((item) => (
                  <li key={item.slice(0, 40)}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div>
          {slide07.rightBlocks.map((block) => (
            <div key={block.heading} className="reflection-block">
              <h3>{block.heading}</h3>
              <p>{block.paragraph}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="pm-slide__media">
        <img
          className="pm-slide__graphic pm-slide__graphic--bare"
          src="/brand/management.png"
          alt=""
          decoding="async"
        />
      </div>
    </div>
  );
}

export const SLIDE_RENDERERS: SlideRenderer[] = [
  () => <Slide01Hero />,
  () => <Slide02Team />,
  () => <Slide03Description />,
  () => <Slide04Features />,
  () => <Slide05Architecture />,
  () => <Slide06Demo />,
  () => <Slide07Reflection />,
];
