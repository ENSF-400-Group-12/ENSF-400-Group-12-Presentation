/**
 * Generates editable PPTX + PDF aligned with the web deck: cream bg, serif titles,
 * sans body, header rule, white card panels. Run: npm run build:exports
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import pptxgenImport from "pptxgenjs";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PptxGenJS: new () => any =
  typeof pptxgenImport === "function"
    ? (pptxgenImport as new () => unknown)
    : (pptxgenImport as { default: new () => unknown }).default;

import { GROUP_LABEL, TEAM_MEMBERS } from "../src/content/team";
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

/** Match src/index.css */
const HEX = {
  bg: "F9F8F3",
  ink: "0A0A0A",
  accent: "1A1B3A",
  elevated: "FFFFFF",
  line: "E6E6E6",
  muted: "6A6A6A",
} as const;

/** Web: Cormorant + DM Sans → Office: Georgia + Calibri (Windows). */
const FONT_DISPLAY = "Georgia";
const FONT_BODY = "Calibri";

/** 16:9 in points (matches 13.333" × 7.5" at 72dpi). */
const PDF_W = 960;
const PDF_H = 540;
const PDF_M = 56;

function pdfRgb(hex: string) {
  const n = parseInt(hex, 16);
  return rgb((n >> 16) / 255, ((n >> 8) & 0xff) / 255, (n & 0xff) / 255);
}

type PdfFonts = {
  sans: Awaited<ReturnType<PDFDocument["embedFont"]>>;
  sansBold: Awaited<ReturnType<PDFDocument["embedFont"]>>;
  display: Awaited<ReturnType<PDFDocument["embedFont"]>>;
  displayBold: Awaited<ReturnType<PDFDocument["embedFont"]>>;
};

async function buildPptx(): Promise<void> {
  const pptx = new PptxGenJS();
  pptx.author = "ENSF 400 Group 12";
  pptx.title = "ClosetAI Presentation";
  pptx.subject = "ClosetAI · ENSF 400";
  pptx.layout = "LAYOUT_16x9";

  const slideBg = { color: HEX.bg } as const;
  const M = 0.55;
  const CONTENT_W = 12.35;

  const body = (extra: Record<string, unknown> = {}) => ({
    fontFace: FONT_BODY,
    color: HEX.muted,
    fontSize: 14,
    ...extra,
  });

  const displayTitle = (extra: Record<string, unknown> = {}) => ({
    fontFace: FONT_DISPLAY,
    color: HEX.ink,
    bold: true,
    ...extra,
  });

  function addHeader(s: { addText: Function; addShape: Function }, kicker: string, title: string) {
    s.addText(kicker.toUpperCase(), {
      fontFace: FONT_BODY,
      fontSize: 10,
      color: HEX.muted,
      x: M,
      y: 0.38,
      w: 4,
      h: 0.28,
      characterSpacing: 1.2,
    });
    s.addText(title, {
      ...displayTitle(),
      fontSize: 34,
      x: M,
      y: 0.62,
      w: CONTENT_W,
      h: 0.72,
    });
    s.addShape(pptx.ShapeType.line, {
      x: M,
      y: 1.38,
      w: CONTENT_W,
      h: 0,
      line: { color: HEX.line, width: 1 },
    });
    return 1.58;
  }

  function cardBack(s: { addShape: Function }, x: number, y: number, w: number, h: number) {
    s.addShape(pptx.ShapeType.roundRect, {
      x,
      y,
      w,
      h,
      fill: { color: HEX.elevated },
      line: { color: HEX.line, width: 1 },
      rectRadius: 0.12,
    });
  }

  // —— Slide 1 ——
  {
    const s = pptx.addSlide();
    s.background = slideBg;
    s.addText("ClosetAI", {
      ...displayTitle(),
      fontSize: 52,
      align: "center",
      x: "8%",
      y: 1.65,
      w: "84%",
      h: 0.95,
    });
    s.addText(slide01Title.tagline, {
      fontFace: FONT_BODY,
      fontSize: 19,
      color: HEX.muted,
      align: "center",
      x: "12%",
      y: 2.85,
      w: "76%",
      h: 1.35,
    });
    s.addText(slide01Title.footerParts.join("     ·     "), {
      fontFace: FONT_BODY,
      fontSize: 11,
      color: HEX.muted,
      align: "center",
      x: "8%",
      y: 6.05,
      w: "84%",
      h: 0.45,
    });
  }

  // —— Slide 2 ——
  {
    const s = pptx.addSlide();
    s.background = slideBg;
    const y0 = addHeader(s, GROUP_LABEL, "Team");
    const colW = 5.95;
    const gap = 0.35;
    const cardH = 1.38;
    TEAM_MEMBERS.forEach((m, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = M + col * (colW + gap);
      const y = y0 + row * (cardH + gap);
      cardBack(s, x - 0.06, y - 0.06, colW + 0.12, cardH + 0.12);
      s.addText(m.name, {
        ...displayTitle(),
        fontSize: 19,
        x: x + 0.2,
        y: y + 0.12,
        w: colW - 0.4,
        h: 0.38,
      });
      let yy = y + 0.44;
      if (m.role) {
        s.addText(m.role, {
          ...body(),
          fontSize: 13,
          x: x + 0.2,
          y: yy,
          w: colW - 0.4,
          h: 0.28,
        });
        yy += 0.32;
      }
      s.addText(`UCID ${m.ucid}`, {
        fontFace: FONT_BODY,
        fontSize: 10,
        color: HEX.muted,
        x: x + 0.2,
        y: yy,
        w: colW - 0.4,
        h: 0.26,
      });
    });
  }

  // —— Slide 3 ——
  {
    const s = pptx.addSlide();
    s.background = slideBg;
    const y0 = addHeader(s, slide03.kicker, slide03.title);
    const split = 6.15;
    const leftW = split - M - 0.2;
    const rightX = split;
    const rightW = M + CONTENT_W - split;
    s.addText(slide03.leftParagraphs.join("\n\n"), {
      ...body(),
      fontSize: 15,
      x: M,
      y: y0,
      w: leftW,
      h: 4.85,
      valign: "top",
    });
    s.addText(slide03.rightHeading.toUpperCase(), {
      fontFace: FONT_BODY,
      fontSize: 10,
      bold: true,
      color: HEX.accent,
      characterSpacing: 1,
      x: rightX,
      y: y0,
      w: rightW,
      h: 0.32,
    });
    s.addText(
      slide03.bullets.map((b) => ({
        text: b,
        options: { ...body(), bullet: true, fontSize: 13 },
      })),
      { x: rightX, y: y0 + 0.38, w: rightW - 0.1, h: 4.45, valign: "top" }
    );
  }

  // —— Slide 4 ——
  {
    const s = pptx.addSlide();
    s.background = slideBg;
    const y0 = addHeader(s, slide04.kicker, slide04.title);
    const cw = 3.95;
    const ch = 3.45;
    const g = 0.22;
    slide04.cards.forEach((c, i) => {
      const x = M + i * (cw + g);
      cardBack(s, x - 0.05, y0 - 0.05, cw + 0.1, ch + 0.1);
      s.addText(c.label, {
        fontFace: FONT_BODY,
        fontSize: 10,
        bold: true,
        color: HEX.accent,
        x: x + 0.22,
        y: y0 + 0.14,
        w: cw - 0.44,
        h: 0.28,
      });
      s.addText(c.title, {
        ...displayTitle(),
        fontSize: 22,
        x: x + 0.22,
        y: y0 + 0.42,
        w: cw - 0.44,
        h: 0.48,
      });
      s.addText(c.body, {
        ...body(),
        fontSize: 14,
        x: x + 0.22,
        y: y0 + 0.95,
        w: cw - 0.44,
        h: 2.35,
        valign: "top",
      });
    });
    s.addText(slide04.footer, {
      ...body(),
      fontSize: 13,
      x: M,
      y: y0 + ch + 0.35,
      w: CONTENT_W,
      h: 0.85,
      valign: "top",
    });
  }

  // —— Slide 5 ——
  {
    const s = pptx.addSlide();
    s.background = slideBg;
    const y0 = addHeader(s, slide05.kicker, slide05.title);
    const cw = 3.92;
    const ch = 2.85;
    const g = 0.2;
    slide05.columns.forEach((col, i) => {
      const x = M + i * (cw + g);
      cardBack(s, x - 0.05, y0 - 0.05, cw + 0.1, ch + 0.1);
      s.addText(col.heading.toUpperCase(), {
        fontFace: FONT_BODY,
        fontSize: 9,
        color: HEX.muted,
        characterSpacing: 1.2,
        x: x + 0.2,
        y: y0 + 0.14,
        w: cw - 0.4,
        h: 0.3,
      });
      s.addText(col.lines.join("\n"), {
        ...body(),
        fontSize: 14,
        x: x + 0.2,
        y: y0 + 0.48,
        w: cw - 0.4,
        h: ch - 0.55,
        valign: "top",
      });
    });
    const yFoot = y0 + ch + 0.28;
    s.addText(slide05.footer, {
      ...body(),
      fontSize: 13,
      x: M,
      y: yFoot,
      w: CONTENT_W,
      h: 1.05,
      valign: "top",
    });
    s.addText(slide05.pills.join("     ·     "), {
      fontFace: FONT_BODY,
      fontSize: 10,
      color: HEX.muted,
      x: M,
      y: yFoot + 1.12,
      w: CONTENT_W,
      h: 0.4,
    });
  }

  // —— Slide 6 ——
  {
    const s = pptx.addSlide();
    s.background = slideBg;
    const y0 = addHeader(s, slide06.kicker, slide06.title);
    const boxW = 8.2;
    const boxH = 2.85;
    const bx = (13.333 - boxW) / 2;
    const by = y0 + 0.35;
    s.addShape(pptx.ShapeType.roundRect, {
      x: bx,
      y: by,
      w: boxW,
      h: boxH,
      fill: { color: HEX.elevated },
      line: { color: HEX.line, width: 1, dashType: "dash" },
      rectRadius: 0.15,
    });
    s.addText(slide06.centerTitle, {
      ...displayTitle(),
      fontSize: 32,
      align: "center",
      x: bx,
      y: by + 0.95,
      w: boxW,
      h: 0.9,
    });
  }

  // —— Slide 7 ——
  {
    const s = pptx.addSlide();
    s.background = slideBg;
    const y0 = addHeader(s, slide07.kicker, slide07.title);
    const leftW = 5.95;
    const rightX = M + leftW + 0.35;
    const rightW = CONTENT_W - leftW - 0.35;
    let yL = y0;
    slide07.leftBlocks.forEach((block) => {
      s.addText(block.heading, {
        ...displayTitle(),
        fontSize: 19,
        x: M,
        y: yL,
        w: leftW,
        h: 0.38,
      });
      yL += 0.42;
      s.addText(
        block.bullets.map((b) => ({
          text: b,
          options: { ...body(), bullet: true, fontSize: 13 },
        })),
        { x: M, y: yL, w: leftW - 0.05, h: 1.95, valign: "top" }
      );
      yL += 2.12;
    });
    let yR = y0;
    slide07.rightBlocks.forEach((block) => {
      s.addText(block.heading, {
        ...displayTitle(),
        fontSize: 19,
        x: rightX,
        y: yR,
        w: rightW,
        h: 0.38,
      });
      yR += 0.42;
      s.addText(block.paragraph, {
        ...body(),
        fontSize: 14,
        x: rightX,
        y: yR,
        w: rightW,
        h: 1.55,
        valign: "top",
      });
      yR += 1.72;
    });
  }

  await pptx.writeFile({ fileName: OUT_PPTX });
}

function wrapPdf(
  text: string,
  font: PdfFonts["sans"],
  size: number,
  maxW: number
): string[] {
  return text.split("\n").flatMap((p) => {
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
  const W = PDF_W;
  const H = PDF_H;
  const M = PDF_M;
  const pdf = await PDFDocument.create();
  const fonts: PdfFonts = {
    sans: await pdf.embedFont(StandardFonts.Helvetica),
    sansBold: await pdf.embedFont(StandardFonts.HelveticaBold),
    display: await pdf.embedFont(StandardFonts.TimesRoman),
    displayBold: await pdf.embedFont(StandardFonts.TimesRomanBold),
  };

  const bg = pdfRgb(HEX.bg);
  const ink = pdfRgb(HEX.ink);
  const muted = pdfRgb(HEX.muted);
  const accent = pdfRgb(HEX.accent);
  const lineC = pdfRgb(HEX.line);
  const white = rgb(1, 1, 1);
  const maxW = W - 2 * M;
  const colHalf = (maxW - 28) / 2;

  function newPage() {
    const p = pdf.addPage([W, H]);
    p.drawRectangle({ x: 0, y: 0, width: W, height: H, color: bg });
    return p;
  }

  /** Returns Y (from bottom) where main content should start. */
  function drawHeader(
    p: ReturnType<PDFDocument["addPage"]>,
    kicker: string,
    title: string
  ): number {
    let y = H - M;
    p.drawText(kicker.toUpperCase(), {
      x: M,
      y,
      size: 10,
      font: fonts.sans,
      color: muted,
    });
    y -= 22;
    p.drawText(title, {
      x: M,
      y,
      size: 32,
      font: fonts.displayBold,
      color: ink,
    });
    y -= 12;
    p.drawLine({
      start: { x: M, y },
      end: { x: W - M, y },
      thickness: 1,
      color: lineC,
    });
    y -= 28;
    return y;
  }

  // 1 Title
  {
    const p = newPage();
    const word = "ClosetAI";
    const sz = 46;
    const tw = fonts.displayBold.widthOfTextAtSize(word, sz);
    p.drawText(word, {
      x: (W - tw) / 2,
      y: H - M - 100,
      size: sz,
      font: fonts.displayBold,
      color: ink,
    });
    let y = H - M - 155;
    for (const line of wrapPdf(slide01Title.tagline, fonts.sans, 16, maxW * 0.85)) {
      const lw = fonts.sans.widthOfTextAtSize(line, 16);
      p.drawText(line, { x: (W - lw) / 2, y, size: 16, font: fonts.sans, color: muted });
      y -= 22;
    }
    const foot = slide01Title.footerParts.join("  ·  ");
    const fw = fonts.sans.widthOfTextAtSize(foot, 11);
    p.drawText(foot, {
      x: (W - fw) / 2,
      y: M + 8,
      size: 11,
      font: fonts.sans,
      color: muted,
    });
  }

  // 2 Team
  {
    const p = newPage();
    const y0 = drawHeader(p, GROUP_LABEL, "Team");
    const half = (maxW - 20) / 2;
    const cardH = 68;
    const cardW = half - 8;
    TEAM_MEMBERS.forEach((mem, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = M + col * (half + 20);
      const top = y0 - row * (cardH + 14);
      const bottom = top - cardH;
      p.drawRectangle({
        x: x - 4,
        y: bottom,
        width: cardW + 8,
        height: cardH,
        color: white,
        borderColor: lineC,
        borderWidth: 1,
      });
      let ty = top - 18;
      p.drawText(mem.name, {
        x: x + 8,
        y: ty,
        size: 16,
        font: fonts.displayBold,
        color: ink,
      });
      ty -= 20;
      if (mem.role) {
        p.drawText(mem.role, {
          x: x + 8,
          y: ty,
          size: 12,
          font: fonts.sans,
          color: muted,
        });
        ty -= 16;
      }
      p.drawText(`UCID ${mem.ucid}`, {
        x: x + 8,
        y: ty,
        size: 10,
        font: fonts.sans,
        color: muted,
      });
    });
  }

  // 3 Split
  {
    const p = newPage();
    const y0 = drawHeader(p, slide03.kicker, slide03.title);
    const splitX = M + colHalf + 28;
    let yL = y0;
    for (const para of slide03.leftParagraphs) {
      for (const line of wrapPdf(para, fonts.sans, 14, colHalf - 8)) {
        p.drawText(line, { x: M, y: yL, size: 14, font: fonts.sans, color: muted });
        yL -= 19;
      }
      yL -= 10;
    }
    let yR = y0;
    p.drawText(slide03.rightHeading.toUpperCase(), {
      x: splitX,
      y: yR,
      size: 10,
      font: fonts.sansBold,
      color: accent,
    });
    yR -= 20;
    for (const b of slide03.bullets) {
      for (const line of wrapPdf(`• ${b}`, fonts.sans, 13, colHalf - 8)) {
        p.drawText(line, { x: splitX, y: yR, size: 13, font: fonts.sans, color: muted });
        yR -= 17;
      }
      yR -= 6;
    }
  }

  // 4 Cards
  {
    const p = newPage();
    const y0 = drawHeader(p, slide04.kicker, slide04.title);
    const cw = (maxW - 32) / 3;
    const ch = 210;
    const g = 14;
    slide04.cards.forEach((c, i) => {
      const x = M + i * (cw + g);
      const top = y0;
      const bottom = top - ch;
      p.drawRectangle({
        x,
        y: bottom,
        width: cw,
        height: ch,
        color: white,
        borderColor: lineC,
        borderWidth: 1,
      });
      let yy = top - 16;
      p.drawText(c.label, {
        x: x + 12,
        y: yy,
        size: 10,
        font: fonts.sansBold,
        color: accent,
      });
      yy -= 18;
      p.drawText(c.title, {
        x: x + 12,
        y: yy,
        size: 17,
        font: fonts.displayBold,
        color: ink,
      });
      yy -= 26;
      for (const line of wrapPdf(c.body, fonts.sans, 13, cw - 24)) {
        p.drawText(line, { x: x + 12, y: yy, size: 13, font: fonts.sans, color: muted });
        yy -= 16;
      }
    });
    let fy = y0 - ch - 36;
    for (const line of wrapPdf(slide04.footer, fonts.sans, 13, maxW)) {
      p.drawText(line, { x: M, y: fy, size: 13, font: fonts.sans, color: muted });
      fy -= 17;
    }
  }

  // 5 Arch
  {
    const p = newPage();
    const y0 = drawHeader(p, slide05.kicker, slide05.title);
    const cw = (maxW - 32) / 3;
    const ch = 175;
    const g = 14;
    slide05.columns.forEach((col, i) => {
      const x = M + i * (cw + g);
      const top = y0;
      const bottom = top - ch;
      p.drawRectangle({
        x,
        y: bottom,
        width: cw,
        height: ch,
        color: white,
        borderColor: lineC,
        borderWidth: 1,
      });
      let yy = top - 14;
      p.drawText(col.heading.toUpperCase(), {
        x: x + 10,
        y: yy,
        size: 9,
        font: fonts.sans,
        color: muted,
      });
      yy -= 22;
      for (const ln of col.lines) {
        for (const line of wrapPdf(ln, fonts.sans, 13, cw - 20)) {
          p.drawText(line, { x: x + 10, y: yy, size: 13, font: fonts.sans, color: muted });
          yy -= 16;
        }
      }
    });
    let fy = y0 - ch - 32;
    for (const line of wrapPdf(slide05.footer, fonts.sans, 13, maxW)) {
      p.drawText(line, { x: M, y: fy, size: 13, font: fonts.sans, color: muted });
      fy -= 17;
    }
    fy -= 8;
    p.drawText(slide05.pills.join("  ·  "), {
      x: M,
      y: fy,
      size: 10,
      font: fonts.sans,
      color: muted,
    });
  }

  // 6 Demo
  {
    const p = newPage();
    const y0 = drawHeader(p, slide06.kicker, slide06.title);
    const boxW = 520;
    const boxH = 200;
    const bx = (W - boxW) / 2;
    const bottom = y0 - 40 - boxH;
    p.drawRectangle({
      x: bx,
      y: bottom,
      width: boxW,
      height: boxH,
      color: white,
      borderColor: lineC,
      borderWidth: 1.5,
    });
    const ct = slide06.centerTitle;
    const ts = 26;
    const tw = fonts.displayBold.widthOfTextAtSize(ct, ts);
    p.drawText(ct, {
      x: (W - tw) / 2,
      y: bottom + boxH / 2 - 6,
      size: ts,
      font: fonts.displayBold,
      color: ink,
    });
  }

  // 7 Reflection
  {
    const p = newPage();
    const y0 = drawHeader(p, slide07.kicker, slide07.title);
    const lx = M;
    const rx = M + colHalf + 28;
    let yL = y0;
    slide07.leftBlocks.forEach((block) => {
      p.drawText(block.heading, {
        x: lx,
        y: yL,
        size: 18,
        font: fonts.displayBold,
        color: ink,
      });
      yL -= 24;
      for (const item of block.bullets) {
        for (const line of wrapPdf(`• ${item}`, fonts.sans, 12, colHalf - 6)) {
          p.drawText(line, { x: lx, y: yL, size: 12, font: fonts.sans, color: muted });
          yL -= 15;
        }
        yL -= 6;
      }
      yL -= 10;
    });
    let yR = y0;
    slide07.rightBlocks.forEach((block) => {
      p.drawText(block.heading, {
        x: rx,
        y: yR,
        size: 18,
        font: fonts.displayBold,
        color: ink,
      });
      yR -= 24;
      for (const line of wrapPdf(block.paragraph, fonts.sans, 12, colHalf - 6)) {
        p.drawText(line, { x: rx, y: yR, size: 12, font: fonts.sans, color: muted });
        yR -= 15;
      }
      yR -= 14;
    });
  }

  writeFileSync(OUT_PDF, await pdf.save());
}

async function main(): Promise<void> {
  mkdirSync(outDir, { recursive: true });
  await buildPptx();
  await buildPdf();
  console.log(`Wrote ${OUT_PPTX}`);
  console.log(`Wrote ${OUT_PDF}`);
}

void main();
