import { PresentationDeck } from "./components/PresentationDeck";
import { SLIDE_RENDERERS } from "./slides/slideContent";

export default function App() {
  return (
    <main>
      <PresentationDeck slides={SLIDE_RENDERERS} />
    </main>
  );
}
