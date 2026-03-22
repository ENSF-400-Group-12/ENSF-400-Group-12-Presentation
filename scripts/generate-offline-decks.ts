/**
 * Generates editable PPTX (native PowerPoint shapes) and PDF (real vector text)
 * from src/content/slideCopy.ts + team roster. Run: npm run build:exports
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import pptxgenImport from "pptxgenjs";

/** pptxgenjs v4: default export is the class; some loaders nest `.default`. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PptxGenJS: new () => any =
  typeof pptxgenImport === "function"
    ? (pptxgenImport as new () => unknown)
    : (pptxgenImport as { default: new () => unknown }).default;
import { TEAM_MEMBERS } from "../src/content/team";
import {
  slide01Title,
  slide03,
  slide04,
  slide05,
  slide06,
  slide07,
} from "../src/content/slideCopy";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = join(root, "export");
const OUT_PPTX = join(outDir, "ClosetAI-ENSF400-Group12.pptx");
const OUT_PDF = join(outDir, "ClosetAI-ENSF400-Group12.pdf");

const BG = "F9F8F3";
const INK = "0A0A0A";
const ACCENT = "1A1B3A";
const MUTED = "5C5C5C";

async function buildPptx(): Promise<void> {
  const pptx = new PptxGenJS();
  pptx.author = "ENSF 400 Group 12";
  pptx.title = "ClosetAI Presentation";
  pptx.subject = "ClosetAI · ENSF 400";
  pptx.layout = "LAYOUT_16x9";

  /** pptxgenjs v4: use top-level `color` on slide background, not nested `fill`. */
  const slideBg = { color: BG } as const;
  const base = { color: INK, fontFace: "Arial" } as const;
  const kickerOpts = { ...base, fontSize: 11, color: MUTED } as const;
  const titleOpts = { ...base, fontSize: 32, bold: true, color: INK } as const;
  const bodyOpts = { ...base, fontSize: 15, color: MUTED } as const;
  const bulletOpts = { ...base, fontSize: 14, bullet: true, color: MUTED } as const;

  // Slide 1 — title (text wordmark; fully editable)
  {
    const s = pptx.addSlide();
    s.background = slideBg;
    s.addText("ClosetAI", {
      ...base,
      fontSize: 54,
      bold: true,
      align: "center",
      w: "90%",
      h: 1.2,
      x: "5%",
      y: 1.8,
      color: INK,
    });
    s.addText(slide01Title.tagline, {
      ...base,
      fontSize: 20,
      align: "center",
      w: "80%",
      h: 1.5,
      x: "10%",
      y: 3.1,
      color: MUTED,
    });
    s.addText(slide01Title.footerParts.join("   ·   "), {
      ...base,
      fontSize: 12,
      align: "center",
      w: "90%",
      y: 5.8,
      x: "5%",
      color: MUTED,
    });
  }

  // Slide 2 — team
  {
    const s = pptx.addSlide();
    s.background = slideBg;
    s.addText("Group 12", { ...kickerOpts, x: 0.5, y: 0.45, w: 4, h: 0.35 });
    s.addText("Team", { ...titleOpts, x: 0.5, y: 0.75, w: 12, h: 0.8 });
    let y = 1.85;
    const colW = 5.8;
    TEAM_MEMBERS.forEach((m, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = 0.55 + col * (colW + 0.4);
      const yy = y + row * 1.55;
      s.addText(m.name, {
        ...base,
        fontSize: 20,
        bold: true,
        x,
        y: yy,
        w: colW,
        h: 0.45,
      });
      if (m.role) {
        s.addText(m.role, { ...bodyOpts, x, y: yy + 0.42, w: colW, h: 0.35 });
      }
      s.addText(`UCID ${m.ucid}`, {
        ...base,
        fontSize: 11,
        color: MUTED,
        x,
        y: yy + (m.role ? 0.78 : 0.45),
        w: colW,
        h: 0.3,
      });
    });
  }

  // Slide 3
  {
    const s = pptx.addSlide();
    s.background = slideBg;
    s.addText(slide03.kicker, { ...kickerOpts, x: 0.5, y: 0.45, w: 5, h: 0.35 });
    s.addText(slide03.title, { ...titleOpts, x: 0.5, y: 0.75, w: 12, h: 0.85 });
    s.addText(slide03.leftParagraphs.join("\n\n"), {
      ...bodyOpts,
      x: 0.55,
      y: 1.75,
      w: 5.9,
      h: 4.5,
      valign: "top",
    });
    s.addText(slide03.rightHeading, {
      ...base,
      fontSize: 12,
      bold: true,
      color: ACCENT,
      x: 6.65,
      y: 1.75,
      w: 6.2,
      h: 0.35,
    });
    s.addText(
      slide03.bullets.map((b) => ({ text: b, options: bulletOpts })),
      { x: 6.65, y: 2.15, w: 6.2, h: 4.2, valign: "top" }
    );
  }

  // Slide 4
  {
    const s = pptx.addSlide();
    s.background = slideBg;
    s.addText(slide04.kicker, { ...kickerOpts, x: 0.5, y: 0.45, w: 4, h: 0.35 });
    s.addText(slide04.title, { ...titleOpts, x: 0.5, y: 0.75, w: 12, h: 0.8 });
    const cw = 4.1;
    slide04.cards.forEach((c, i) => {
      const x = 0.55 + i * (cw + 0.25);
      s.addText(c.label, {
        ...base,
        fontSize: 11,
        bold: true,
        color: ACCENT,
        x,
        y: 1.75,
        w: cw,
        h: 0.3,
      });
      s.addText(c.title, {
        ...base,
        fontSize: 22,
        bold: true,
        x,
        y: 2.05,
        w: cw,
        h: 0.55,
      });
      s.addText(c.body, { ...bodyOpts, x, y: 2.65, w: cw, h: 2.8, valign: "top" });
    });
    s.addText(slide04.footer, {
      ...bodyOpts,
      fontSize: 13,
      x: 0.55,
      y: 5.85,
      w: 12.3,
      h: 0.9,
    });
  }

  // Slide 5
  {
    const s = pptx.addSlide();
    s.background = slideBg;
    s.addText(slide05.kicker, { ...kickerOpts, x: 0.5, y: 0.45, w: 4, h: 0.35 });
    s.addText(slide05.title, { ...titleOpts, x: 0.5, y: 0.75, w: 12, h: 0.8 });
    const cw = 3.95;
    slide05.columns.forEach((col, i) => {
      const x = 0.55 + i * (cw + 0.2);
      s.addText(col.heading.toUpperCase(), {
        ...kickerOpts,
        fontSize: 10,
        x,
        y: 1.7,
        w: cw,
        h: 0.35,
      });
      s.addText(col.lines.join("\n"), {
        ...bodyOpts,
        x,
        y: 2.05,
        w: cw,
        h: 2.5,
        valign: "top",
      });
    });
    s.addText(slide05.footer, {
      ...bodyOpts,
      fontSize: 13,
      x: 0.55,
      y: 4.85,
      w: 12.3,
      h: 1.1,
      valign: "top",
    });
    s.addText(slide05.pills.join("   ·   "), {
      ...base,
      fontSize: 11,
      color: MUTED,
      x: 0.55,
      y: 6.15,
      w: 12.3,
      h: 0.45,
    });
  }

  // Slide 6
  {
    const s = pptx.addSlide();
    s.background = slideBg;
    s.addText(slide06.kicker, { ...kickerOpts, x: 0.5, y: 0.45, w: 4, h: 0.35 });
    s.addText(slide06.title, { ...titleOpts, x: 0.5, y: 0.75, w: 12, h: 0.8 });
    s.addText(slide06.centerTitle, {
      ...base,
      fontSize: 36,
      bold: true,
      align: "center",
      x: "15%",
      y: 3,
      w: "70%",
      h: 1,
    });
  }

  // Slide 7
  {
    const s = pptx.addSlide();
    s.background = slideBg;
    s.addText(slide07.kicker, { ...kickerOpts, x: 0.5, y: 0.45, w: 4, h: 0.35 });
    s.addText(slide07.title, { ...titleOpts, x: 0.5, y: 0.75, w: 12, h: 0.8 });
    let yL = 1.75;
    slide07.leftBlocks.forEach((block) => {
      s.addText(block.heading, {
        ...base,
        fontSize: 18,
        bold: true,
        x: 0.55,
        y: yL,
        w: 5.9,
        h: 0.4,
      });
      yL += 0.45;
      s.addText(
        block.bullets.map((b) => ({ text: b, options: bulletOpts })),
        { x: 0.55, y: yL, w: 5.9, h: 1.8, valign: "top" }
      );
      yL += 2.05;
    });
    let yR = 1.75;
    slide07.rightBlocks.forEach((block) => {
      s.addText(block.heading, {
        ...base,
        fontSize: 18,
        bold: true,
        x: 6.65,
        y: yR,
        w: 6.2,
        h: 0.4,
      });
      yR += 0.45;
      s.addText(block.paragraph, {
        ...bodyOpts,
        x: 6.65,
        y: yR,
        w: 6.2,
        h: 1.5,
        valign: "top",
      });
      yR += 1.75;
    });
  }

  await pptx.writeFile({ fileName: OUT_PPTX });
}

type PDFFont = Awaited<ReturnType<PDFDocument["embedFont"]>>;

function wrapParagraph(
  text: string,
  font: PDFFont,
  size: number,
  maxW: number
): string[] {
  return text.split(/\n/).flatMap((p) => {
    const words = p.split(/\s+/);
    const out: string[] = [];
    let cur = "";
    for (const w of words) {
      const next = cur ? `${cur} ${w}` : w;
      if (font.widthOfTextAtSize(next, size) <= maxW) cur = next;
      else {
        if (cur) out.push(cur);
        cur = w;
      }
    }
    if (cur) out.push(cur);
    return out;
  });
}

async function buildPdf(): Promise<void> {
  const W = 792;
  const H = 445;
  const m = 48;
  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const bg = rgb(249 / 255, 248 / 255, 243 / 255);
  const ink = rgb(0.04, 0.04, 0.04);
  const muted = rgb(0.36, 0.36, 0.36);
  const accent = rgb(26 / 255, 27 / 255, 58 / 255);
  const maxW = W - 2 * m;
  const colW = (maxW - 24) / 2;

  const addPage = () => {
    const p = pdf.addPage([W, H]);
    p.drawRectangle({ x: 0, y: 0, width: W, height: H, color: bg });
    return p;
  };

  // 1
  {
    const p = addPage();
    let y = H - m - 56;
    p.drawText("ClosetAI", {
      x: m,
      y,
      size: 40,
      font: fontBold,
      color: ink,
    });
    y -= 72;
    for (const line of wrapParagraph(slide01Title.tagline, font, 16, maxW)) {
      p.drawText(line, { x: m, y, size: 16, font, color: muted });
      y -= 22;
    }
    y = m + 20;
    p.drawText(slide01Title.footerParts.join("  ·  "), {
      x: m,
      y,
      size: 11,
      font,
      color: muted,
    });
  }

  // 2
  {
    const p = addPage();
    let y = H - m - 18;
    p.drawText("Group 12", { x: m, y, size: 11, font, color: muted });
    y -= 28;
    p.drawText("Team", { x: m, y, size: 28, font: fontBold, color: ink });
    y -= 40;
    const half = (maxW - 16) / 2;
    const rowH = 72;
    TEAM_MEMBERS.forEach((mem, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = m + col * (half + 16);
      const yy = y - row * rowH;
      p.drawText(mem.name, { x, y: yy, size: 15, font: fontBold, color: ink });
      let yy2 = yy - 18;
      if (mem.role) {
        p.drawText(mem.role, { x, y: yy2, size: 11, font, color: muted });
        yy2 -= 14;
      }
      p.drawText(`UCID ${mem.ucid}`, { x, y: yy2, size: 10, font, color: muted });
    });
  }

  // 3
  {
    const p = addPage();
    let y = H - m - 18;
    p.drawText(slide03.kicker, { x: m, y, size: 11, font, color: muted });
    y -= 28;
    p.drawText(slide03.title, { x: m, y, size: 26, font: fontBold, color: ink });
    y -= 40;
    const leftX = m;
    const rightX = m + colW + 24;
    let yL = y;
    for (const para of slide03.leftParagraphs) {
      for (const line of wrapParagraph(para, font, 13, colW)) {
        p.drawText(line, { x: leftX, y: yL, size: 13, font, color: muted });
        yL -= 17;
      }
      yL -= 8;
    }
    let yR = y;
    p.drawText(slide03.rightHeading, {
      x: rightX,
      y: yR,
      size: 12,
      font: fontBold,
      color: accent,
    });
    yR -= 20;
    for (const b of slide03.bullets) {
      const wrapped = wrapParagraph(`• ${b}`, font, 12, colW);
      for (const line of wrapped) {
        p.drawText(line, { x: rightX, y: yR, size: 12, font, color: muted });
        yR -= 15;
      }
      yR -= 4;
    }
  }

  // 4
  {
    const p = addPage();
    let y = H - m - 18;
    p.drawText(slide04.kicker, { x: m, y, size: 11, font, color: muted });
    y -= 28;
    p.drawText(slide04.title, { x: m, y, size: 26, font: fontBold, color: ink });
    y -= 42;
    const cw = (maxW - 32) / 3;
    slide04.cards.forEach((c, i) => {
      const x = m + i * (cw + 16);
      let yy = y;
      p.drawText(c.label, { x, y: yy, size: 10, font: fontBold, color: accent });
      yy -= 16;
      p.drawText(c.title, { x, y: yy, size: 16, font: fontBold, color: ink });
      yy -= 22;
      for (const line of wrapParagraph(c.body, font, 12, cw - 4)) {
        p.drawText(line, { x, y: yy, size: 12, font, color: muted });
        yy -= 15;
      }
    });
    let fy = 115;
    for (const line of wrapParagraph(slide04.footer, font, 12, maxW)) {
      p.drawText(line, { x: m, y: fy, size: 12, font, color: muted });
      fy -= 15;
    }
  }

  // 5
  {
    const p = addPage();
    let y = H - m - 18;
    p.drawText(slide05.kicker, { x: m, y, size: 11, font, color: muted });
    y -= 28;
    p.drawText(slide05.title, { x: m, y, size: 26, font: fontBold, color: ink });
    y -= 40;
    const cw5 = (maxW - 32) / 3;
    slide05.columns.forEach((col, i) => {
      const x = m + i * (cw5 + 16);
      let yy = y;
      p.drawText(col.heading.toUpperCase(), {
        x,
        y: yy,
        size: 9,
        font,
        color: muted,
      });
      yy -= 16;
      for (const line of col.lines) {
        for (const wl of wrapParagraph(line, font, 12, cw5 - 4)) {
          p.drawText(wl, { x, y: yy, size: 12, font, color: muted });
          yy -= 15;
        }
      }
    });
    let fy5 = 130;
    for (const line of wrapParagraph(slide05.footer, font, 12, maxW)) {
      p.drawText(line, { x: m, y: fy5, size: 12, font, color: muted });
      fy5 -= 15;
    }
    fy5 -= 6;
    p.drawText(slide05.pills.join("  ·  "), {
      x: m,
      y: fy5,
      size: 10,
      font,
      color: muted,
    });
  }

  // 6
  {
    const p = addPage();
    let y = H - m - 18;
    p.drawText(slide06.kicker, { x: m, y, size: 11, font, color: muted });
    y -= 28;
    p.drawText(slide06.title, { x: m, y, size: 26, font: fontBold, color: ink });
    const tw = fontBold.widthOfTextAtSize(slide06.centerTitle, 28);
    p.drawText(slide06.centerTitle, {
      x: (W - tw) / 2,
      y: H / 2,
      size: 28,
      font: fontBold,
      color: ink,
    });
  }

  // 7
  {
    const p = addPage();
    let y = H - m - 18;
    p.drawText(slide07.kicker, { x: m, y, size: 11, font, color: muted });
    y -= 28;
    p.drawText(slide07.title, { x: m, y, size: 26, font: fontBold, color: ink });
    y -= 36;
    const lx = m;
    const rx = m + colW + 24;
    let yL = y;
    slide07.leftBlocks.forEach((block) => {
      p.drawText(block.heading, {
        x: lx,
        y: yL,
        size: 16,
        font: fontBold,
        color: ink,
      });
      yL -= 22;
      for (const item of block.bullets) {
        for (const line of wrapParagraph(`• ${item}`, font, 11, colW)) {
          p.drawText(line, { x: lx, y: yL, size: 11, font, color: muted });
          yL -= 14;
        }
        yL -= 4;
      }
      yL -= 8;
    });
    let yR = y;
    slide07.rightBlocks.forEach((block) => {
      p.drawText(block.heading, {
        x: rx,
        y: yR,
        size: 16,
        font: fontBold,
        color: ink,
      });
      yR -= 22;
      for (const line of wrapParagraph(block.paragraph, font, 11, colW)) {
        p.drawText(line, { x: rx, y: yR, size: 11, font, color: muted });
        yR -= 14;
      }
      yR -= 12;
    });
  }

  const bytes = await pdf.save();
  writeFileSync(OUT_PDF, bytes);
}

async function main(): Promise<void> {
  mkdirSync(outDir, { recursive: true });
  await buildPptx();
  await buildPdf();
  console.log(`Wrote ${OUT_PPTX}`);
  console.log(`Wrote ${OUT_PDF}`);
}

void main();
