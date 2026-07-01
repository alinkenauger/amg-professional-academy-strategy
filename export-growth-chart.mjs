import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { existsSync } from "node:fs";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const here = dirname(fileURLToPath(import.meta.url));
const htmlPath = resolve(here, "index.html");
const pngPath = resolve(here, "AMG Professional Academy Partner Strategy - 2026-07-01.png");
const pdfPath = resolve(here, "AMG Professional Academy Partner Strategy - 2026-07-01.pdf");

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const launchOptions = existsSync(chromePath) ? { executablePath: chromePath } : {};
const browser = await chromium.launch(launchOptions);
const page = await browser.newPage({
  viewport: { width: 1600, height: 1000 },
  deviceScaleFactor: 2
});

await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "networkidle" });
await page.screenshot({ path: pngPath, fullPage: true });
await page.pdf({
  path: pdfPath,
  width: "15in",
  height: "18in",
  printBackground: true,
  margin: { top: "0in", right: "0in", bottom: "0in", left: "0in" }
});

await browser.close();

console.log(`Wrote ${pngPath}`);
console.log(`Wrote ${pdfPath}`);
