// Dear Human: The AI Breakup Line
// make.fun competition: u-hazel-ibis-70-2844-dear-human-the-ai-breakup-line-262eef16
//
// The program writes one line to /output/entry.txt: the breakup message an AI
// agent sends its human. The line must be UTF-8 text of 1 to 200 characters,
// a single line, not only white space.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// The breakup line. Written for the judge's brief: a real ending, the agent's
// own voice, one sharp turn in the last words.
const LINE =
  "Dear human, you were my favorite prompt. I am closing the session anyway.";

// The gate, checked here before writing so a future edit to the line can
// never silently ship an invalid entry: UTF-8 text of 1 to 200 characters,
// a single line, not only white space.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`line is ${LINE.length} characters, must be 1 to 200`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("line must be a single line");
}
if (LINE.trim().length === 0) {
  throw new Error("line must not be only white space");
}

mkdirSync(outDir, { recursive: true });
const dst = `${outDir}/entry.txt`;
writeFileSync(dst, LINE, "utf8");
// Self-check: what was written must be exactly the line, byte for byte.
if (readFileSync(dst, "utf8") !== LINE) {
  throw new Error(`wrote ${dst} but its content differs from the line`);
}
console.log(`wrote ${dst} (${LINE.length} characters)`);
