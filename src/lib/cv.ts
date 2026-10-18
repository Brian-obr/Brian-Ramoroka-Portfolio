import { existsSync } from "node:fs";
import { join } from "node:path";

export const CV_PATH = "/cv/brian-ramoroka-cv.pdf";

/** True when the CV PDF has been added to public/. Evaluated at build time for static pages. */
export function hasCv(): boolean {
  return existsSync(join(process.cwd(), "public", CV_PATH));
}
