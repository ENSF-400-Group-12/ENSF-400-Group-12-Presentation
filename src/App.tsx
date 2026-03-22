import { useMemo } from "react";
import { PresentationDeck } from "./components/PresentationDeck";
import { SLIDE_RENDERERS } from "./slides/slideContent";

function readExportSlide1Based(): number | undefined {
  const raw = new URLSearchParams(window.location.search).get("export");
  if (raw == null || raw === "") return undefined;
  const n = parseInt(raw, 10);
  if (!Number.isFinite(n)) return undefined;
  if (n < 1 || n > SLIDE_RENDERERS.length) return undefined;
  return n;
}

export default function App() {
  const exportSlide1Based = useMemo(() => readExportSlide1Based(), []);

  return (
    <main className="deck-root">
      <PresentationDeck
        slides={SLIDE_RENDERERS}
        exportSlide1Based={exportSlide1Based}
      />
    </main>
  );
}
