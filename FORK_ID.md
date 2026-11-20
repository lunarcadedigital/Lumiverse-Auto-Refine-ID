# Indonesian anti-slop fork of Auto Refine

This is a modified copy of [Auto Refine](https://github.com/starlitcode/Lumiverse-Auto-Refine)
by starlitcode, version 1.56.5, licensed GPL-3.0-only (see LICENSE). The code is
unchanged except for the defaults below. All credit for the extension belongs to
the original author.

## What changed

Only text in `src/frontend.ts` (and the matching `dist/frontend.js`,
rebuilt with `tsc`), plus one list in `docs/two-models.md`:

1. **`JUDGE_CHECKS`** (what the second model checks): 7 new checks for Indonesian,
   so the list is 14 long. They cover contrast framing ("Bukan ke mana-mana. Hanya
   terbang."), narrated negation ("Dia tidak berkedip."), lines that announce what
   is about to be said, stock Indonesian phrases, counting a sound out loud,
   closing on weather or light, and reassurance in therapy language.
2. **`PHRASES`** (the Instant Penalties block of the built-in prompts): nine
   Indonesian groups of the same kinds as the English ones.
3. **`FILLER`**: a few Indonesian filler words (tiba-tiba, perlahan, sedikit,
   seolah-olah, sepertinya, tampaknya, benar-benar, sungguh, nyaris).
4. **A new prompt block, "Bahasa Indonesia"**, added to the two built-in reply prompts
   (A judge, and A judge that thinks), right after The Finish and after Voice. It
   keeps the rewrite in Indonesian and in the register the passage already has,
   turns a denial plus its answer into the answer alone (with before and after
   pairs), cuts announcing and soothing lines, plain numbers, stock Indonesian
   phrases, and translated-sounding wording. The line judges for your own
   messages are unchanged.
5. **`docs/two-models.md`**: the list of checks, kept identical to the code, as the
   test suite requires.

Nothing else was touched. The permissions, the manifest, the version and the
backend are the same as upstream.

## Checks

- `tsc` rebuilt `dist/frontend.js`; the diff to upstream is only the lines above.
- `bun test`: 932 pass, 0 fail (upstream's own suite, including the test that
  holds the docs list equal to the code list).
- Not tested: the browser suite (`bun run test:ui`), and the extension inside a
  real Lumiverse.

## Limits

- The second model reads the checks in English with Indonesian examples. How well
  it scores Indonesian replies is untested. Tune **Refine when a check reaches**
  (Model tab) and watch the Log tab.
- A check that is true of most replies sends every reply through. "Narrates what a
  character does not do" is the likeliest to be too broad in Indonesian narration.
  If it is, remove that line from **What the second model checks**.
- The refine model needs to write Indonesian well. Pick it on the Model tab.

## Use it

Install from the address where you host this copy, the same way as the original
(Extensions, then the Git address). Or apply `anti-slop-id.patch` to a checkout
of upstream `stable`: `git apply anti-slop-id.patch`.
