// The checks Jev starts with. Jev scores the chance each statement is true of a
// reply, and a reply is refined when any one reaches the line. So each has to
// name the reply the way Jev knows it, ask about one thing, and be listed on
// the page the same way it is in the code.
import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { __testing } from "../src/frontend";

const { JUDGE_CHECKS, BEFORE_CHECKS, PHRASES } = __testing as any;
const checks = String(JUDGE_CHECKS).split("\n");
const page = readFileSync(join(import.meta.dir, "..", "docs/two-models.md"), "utf8");

test("there are checks to read", () => {
  expect(checks.length).toBeGreaterThan(0);
});

test("each one is about `reply`, and is one sentence", () => {
  for (const c of checks) {
    expect(c.startsWith("`reply` ")).toBe(true);
    expect(c.endsWith(".")).toBe(true);
  }
});

test("none is two checks joined with and", () => {
  // Outside the quoted example, which is text and not part of the question.
  for (const c of checks) expect(/\sand\s/.test(c.replace(/"[^"]*"/g, ""))).toBe(false);
});

test("the page lists them exactly as the code has them", () => {
  const block = /The ones it starts with:\n\n```\n([\s\S]*?)\n```/.exec(page);
  expect(block && block[1]).toBe(checks.join("\n"));
});

// The checks Also compare with the reply before it asks, which are the panel's
// box of their own. The same rules, plus naming the reply before it.
const before = String(BEFORE_CHECKS).split("\n");

test("each comparison check is about `reply` and `previous_reply`, and is one sentence", () => {
  for (const c of before) {
    expect(c.startsWith("`reply` ")).toBe(true);
    expect(c.indexOf("`previous_reply`")).toBeGreaterThan(0);
    expect(c.endsWith(".")).toBe(true);
    expect(/\sand\s/.test(c.replace(/"[^"]*"/g, ""))).toBe(false);
  }
});

test("the page lists the comparison checks exactly as the code has them", () => {
  const block = /The ones it compares with:\n\n```\n([\s\S]*?)\n```/.exec(page);
  expect(block && block[1]).toBe(before.join("\n"));
});

// Three kinds of stock writing that a reply full of them still passed: a run of
// paragraphs that each open on a character's name, a sentence chained with
// "dan" three or more times, and one gesture repeated across characters. Each
// is a check, and each has a rule in the built-in prompts, so a reply it flags
// is one the refine knows how to fix.
const KINDS = [
  { check: "dibuka dengan nama seorang karakter diikuti kata kerja", rule: "paragraf berderet yang dibuka nama tokoh" },
  { check: "menyambung tiga bagian atau lebih dalam satu kalimat dengan", rule: "kalimat yang disambung dengan dan tiga kali atau lebih" },
  { check: "mengulang gestur yang sama tiga kali atau lebih", rule: "gestur yang sama diulang pada tokoh berbeda" },
];

test("each of the three added kinds is a check with an example", () => {
  for (const k of KINDS) {
    const c = checks.find((x) => x.indexOf(k.check) >= 0);
    expect(c).toBeDefined();
    expect(/"[^"]+"/.test(String(c))).toBe(true);
  }
});

test("each of the three added kinds has a rule in the phrases the prompts carry", () => {
  for (const k of KINDS) expect(String(PHRASES).indexOf(k.rule)).toBeGreaterThan(-1);
});
