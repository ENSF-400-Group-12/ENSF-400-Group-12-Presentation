/**
 * 1:1 exports: screenshots each live slide (?export=N) at 1920×1080, then builds
 * PPTX + PDF from those PNGs (same pixels as the web deck, logos + CSS included).
 *
 * Prerequisite: npx playwright install chromium
 * Run: npm run build:exports   (runs `npm run build` first via package.json)
 */
import { spawn } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { PDFDocument } from "pdf-lib";
import pptxgenImport from "pptxgenjs";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PptxGenJS: new () => any =
  typeof pptxgenImport === "function"
    ? (pptxgenImport as new () => unknown)
    : (pptxgenImport as { default: new () => unknown }).default;

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const RASTER_DIR = join(root, "export", "raster");
const OUT_PPTX = join(root, "export", "ClosetAI-ENSF400-Group12.pptx");
const OUT_PDF = join(root, "export", "ClosetAI-ENSF400-Group12.pdf");
const VIEWPORT = { width: 1920, height: 1080 } as const;
const SLIDE_COUNT = 7;

function previewBase(port: number): string {
  return `http://127.0.0.1:${port}`;
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

async function waitForServer(url: string, timeoutMs = 120_000): Promise<void> {
  const t0 = Date.now();
  while (Date.now() - t0 < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      /* retry */
    }
    await sleep(200);
  }
  throw new Error(`Timed out waiting for ${url}`);
}

function startPreview(port: number): ReturnType<typeof spawn> {
  const viteCli = join(root, "node_modules", "vite", "bin", "vite.js");
  return spawn(
    process.execPath,
    [viteCli, "preview", "--host", "127.0.0.1", "--port", String(port), "--strictPort"],
    {
      cwd: root,
      stdio: "pipe",
    }
  );
}

async function captureSlides(): Promise<string[]> {
  mkdirSync(RASTER_DIR, { recursive: true });
  const outPaths: string[] = [];

  const preferred = parseInt(process.env.DECK_EXPORT_PORT || "4173", 10);
  let port = preferred;
  let preview: ReturnType<typeof spawn> | null = null;

  for (let attempt = 0; attempt < 8; attempt++) {
    port = preferred + attempt;
    preview = startPreview(port);
    preview.stdout?.on("data", (c: Buffer) => process.stdout.write(c));
    preview.stderr?.on("data", (c: Buffer) => process.stderr.write(c));
    try {
      await waitForServer(`${previewBase(port)}/`, 15_000);
      break;
    } catch {
      preview.kill("SIGTERM");
      preview = null;
      if (attempt === 7) throw new Error("Could not start vite preview on a free port");
    }
  }

  const base = previewBase(port);

  try {

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({
      viewport: VIEWPORT,
      deviceScaleFactor: 1,
    });

    for (let i = 1; i <= SLIDE_COUNT; i++) {
      const url = `${base}/?export=${i}`;
      await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });
      await page.evaluate(() => document.fonts.ready);
      await sleep(500);

      const file = join(RASTER_DIR, `slide-${String(i).padStart(2, "0")}.png`);
      await page.screenshot({
        path: file,
        type: "png",
        fullPage: false,
      });
      outPaths.push(file);
      console.log(`Captured slide ${i} → ${file}`);
    }

    await browser.close();
  } finally {
    preview?.kill("SIGTERM");
    await sleep(300);
    try {
      preview?.kill("SIGKILL");
    } catch {
      /* ignore */
    }
  }

  return outPaths;
}

async function buildPptxFromPngs(pngPaths: string[]): Promise<void> {
  const pptx = new PptxGenJS();
  pptx.layout = "LAYOUT_16x9";
  pptx.author = "ENSF 400 Group 12";
  pptx.title = "ClosetAI Presentation";

  for (const pngPath of pngPaths) {
    const slide = pptx.addSlide();
    // v4 reliably embeds from filesystem path; Buffer `data` can yield empty slides.
    slide.addImage({
      path: pngPath,
      x: 0,
      y: 0,
      w: "100%",
      h: "100%",
    });
  }

  await pptx.writeFile({ fileName: OUT_PPTX });
}

async function buildPdfFromPngs(pngPaths: string[]): Promise<void> {
  const pdf = await PDFDocument.create();

  for (const pngPath of pngPaths) {
    const bytes = readFileSync(pngPath);
    const image = await pdf.embedPng(bytes);
    const { width, height } = image;
    const page = pdf.addPage([width, height]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width,
      height,
    });
  }

  writeFileSync(OUT_PDF, await pdf.save());
}

async function main(): Promise<void> {
  console.log("Capturing slides from preview (1920×1080)…");
  const paths = await captureSlides();
  if (paths.length !== SLIDE_COUNT) {
    throw new Error(`Expected ${SLIDE_COUNT} captures, got ${paths.length}`);
  }
  console.log("Building PPTX…");
  await buildPptxFromPngs(paths);
  console.log("Building PDF…");
  await buildPdfFromPngs(paths);
  console.log(`Done.\n  ${OUT_PPTX}\n  ${OUT_PDF}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
