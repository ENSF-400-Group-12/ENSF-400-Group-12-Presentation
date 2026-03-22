import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

export type SlideRenderer = () => ReactNode;

type Props = {
  slides: SlideRenderer[];
  deckLabel?: string;
};

export function PresentationDeck({ slides, deckLabel = "ClosetAI" }: Props) {
  const [index, setIndex] = useState(0);
  const [motionKey, setMotionKey] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const count = slides.length;
  const safeIndex = Math.min(Math.max(index, 0), count - 1);

  const go = useCallback(
    (next: number) => {
      const clamped = Math.min(Math.max(next, 0), count - 1);
      if (clamped === safeIndex) return;
      setIndex(clamped);
      setMotionKey((k) => k + 1);
    },
    [count, safeIndex]
  );

  useEffect(() => {
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
  }, [count, go, safeIndex]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0]?.clientX ?? null;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
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

  return (
    <div className="deck" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div className="deck__stage">
        <div
          className="slide slide--enter"
          key={motionKey}
          role="group"
          aria-roledescription="slide"
          aria-label={`Slide ${safeIndex + 1} of ${count}`}
        >
          {Current()}
        </div>
      </div>

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
    </div>
  );
}
