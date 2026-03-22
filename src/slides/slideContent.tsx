import { GROUP_LABEL, TEAM_MEMBERS } from "../content/team";
import {
  slide01Title,
  slide03,
  slide04,
  slide05,
  slide06,
  slide07,
} from "../content/slideCopy";
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
      <p className="title-slide__tagline">{slide01Title.tagline}</p>
      <div className="title-slide__footer">
        {slide01Title.footerParts.flatMap((part, i) =>
          i < slide01Title.footerParts.length - 1
            ? [
                <span key={part}>{part}</span>,
                <span key={`d${i}`} className="title-slide__dot" aria-hidden />,
              ]
            : [<span key={part}>{part}</span>]
        )}
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
      <SlideHeader kicker={slide03.kicker} title={slide03.title} />
      <div className="grid-2">
        <div className="prose">
          {slide03.leftParagraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <div>
          <p className="slide-header__kicker" style={{ marginBottom: "0.5rem" }}>
            {slide03.rightHeading}
          </p>
          <ul className="list">
            {slide03.bullets.map((b, i) => {
              const [label, ...rest] = b.split(" ");
              return (
                <li key={i}>
                  <strong>{label}</strong> {rest.join(" ")}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Slide04Features(): JSX.Element {
  return (
    <div className="slide">
      <SlideHeader kicker={slide04.kicker} title={slide04.title} />
      <div className="card-grid card-grid--3">
        {slide04.cards.map((c) => (
          <article key={c.label} className="card">
            <p className="card__label">{c.label}</p>
            <h2 className="card__title">{c.title}</h2>
            <p className="card__body">{c.body}</p>
          </article>
        ))}
      </div>
      <p className="prose--compact" style={{ marginTop: "1rem" }}>
        {slide04.footer}
      </p>
    </div>
  );
}

function Slide05Architecture(): JSX.Element {
  return (
    <div className="slide">
      <SlideHeader kicker={slide05.kicker} title={slide05.title} />
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
    <div className="slide">
      <SlideHeader kicker={slide06.kicker} title={slide06.title} />
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
    <div className="slide">
      <SlideHeader kicker={slide07.kicker} title={slide07.title} />
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
