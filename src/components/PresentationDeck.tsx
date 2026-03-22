import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export type SlideRenderer = () => ReactNode;

type Props = {
  slides: SlideRenderer[];
  deckLabel?: string;
  /**
   * When set (1-based slide number), hides chrome and locks navigation so
   * Playwright can capture a pixel-accurate frame of the live deck.
   */
  exportSlide1Based?: number;
};

export function PresentationDeck({
  slides,
  deckLabel = "ClosetAI",
  exportSlide1Based,
}: Props) {
  const count = slides.length;
  const lockedIndex =
    exportSlide1Based != null &&
    exportSlide1Based >= 1 &&
    exportSlide1Based <= count
      ? exportSlide1Based - 1
      : null;

  const [index, setIndex] = useState(lockedIndex ?? 0);
  const [motionKey, setMotionKey] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const safeIndex =
    lockedIndex !== null
      ? lockedIndex
      : Math.min(Math.max(index, 0), count - 1);

  const go = useCallback(
    (next: number) => {
      if (lockedIndex !== null) return;
      const clamped = Math.min(Math.max(next, 0), count - 1);
      if (clamped === safeIndex) return;
      setIndex(clamped);
      setMotionKey((k) => k + 1);
    },
    [count, lockedIndex, safeIndex]
  );

  useEffect(() => {
    if (lockedIndex !== null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        go(safeIndex + 1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        go(safeIndex - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        go(0);
      } else if (e.key === "End") {
        e.preventDefault();
        go(count - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count, go, lockedIndex, safeIndex]);

  const onTouchStart = (e: React.TouchEvent) => {
    if (lockedIndex !== null) return;
    touchStartX.current = e.changedTouches[0]?.clientX ?? null;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (lockedIndex !== null) return;
    const start = touchStartX.current;
    touchStartX.current = null;
    if (start == null) return;
    const end = e.changedTouches[0]?.clientX ?? start;
    const dx = end - start;
    if (Math.abs(dx) < 48) return;
    if (dx < 0) go(safeIndex + 1);
    else go(safeIndex - 1);
  };

  const progress = (safeIndex + 1) / count;
  const Current = slides[safeIndex];
  const reduceMotion = useReducedMotion();
  const instant = lockedIndex !== null || reduceMotion;

  return (
    <div
      className={lockedIndex !== null ? "deck deck--export" : "deck"}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="deck__stage">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            className="slide slide--motion"
            key={lockedIndex !== null ? `export-${lockedIndex}` : motionKey}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${safeIndex + 1} of ${count}`}
            initial={instant ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={instant ? undefined : { opacity: 0, y: -10 }}
            transition={{
              duration: instant ? 0 : 0.42,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {Current()}
          </motion.div>
        </AnimatePresence>
      </div>

      {lockedIndex === null ? (
      <div className="chrome">
        <div className="chrome__progress">
          <div className="chrome__meta">
            {deckLabel} · {safeIndex + 1} / {count}
          </div>
          <div className="chrome__progress-track">
            <div
              className="chrome__progress-fill"
              style={{ "--p": progress } as CSSProperties}
            />
          </div>
        </div>
        <div className="chrome__hint">
          Arrow keys · Space · Swipe
        </div>
        <div className="chrome__nav">
          <button
            type="button"
            className="chrome__btn"
            aria-label="Previous slide"
            disabled={safeIndex <= 0}
            onClick={() => go(safeIndex - 1)}
          >
            ‹
          </button>
          <button
            type="button"
            className="chrome__btn"
            aria-label="Next slide"
            disabled={safeIndex >= count - 1}
            onClick={() => go(safeIndex + 1)}
          >
            ›
          </button>
        </div>
      </div>
      ) : null}
    </div>
  );
}
