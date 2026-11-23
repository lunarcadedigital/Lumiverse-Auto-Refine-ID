# Indonesian anti-slop fork of Auto Refine

This is a modified copy of [Auto Refine](https://github.com/starlitcode/Lumiverse-Auto-Refine)
by starlitcode, version 1.56.5, licensed GPL-3.0-only (see LICENSE). The code is
unchanged except for the defaults below. All credit for the extension belongs to
the original author.

## What changed

The program code is the same as upstream except small changes (below, items 7 to 10). The changes are prompt and check text in
`src/frontend.ts` (and the matching `dist/frontend.js`, rebuilt with `tsc`), the
docs and tests that quote that text, the README, and the repository links:

1. **`JUDGE_CHECKS`** (what the second model checks): written in Indonesian, 15 checks,
   with Indonesian examples (the first version of this fork had the English ones plus
   7 Indonesian). They cover contrast framing ("Bukan ke mana-mana. Hanya
   terbang."), narrated negation ("Dia tidak berkedip."), lines that announce what
   is about to be said, stock Indonesian phrases, counting a sound out loud,
   closing on weather or light, and reassurance in therapy language.
2. **`PHRASES`** (the Instant Penalties block of the built-in prompts): nine
   Indonesian groups of the same kinds as the English ones.
3. **`FILLER`**: a few Indonesian filler words (tiba-tiba, perlahan, sedikit,
   seolah-olah, sepertinya, tampaknya, benar-benar, sungguh, nyaris).
4. **All built-in prompt text is in Indonesian** (the four prompts: A judge, A judge
   that thinks, A line judge, A line judge that thinks). Block names, block ids and
   tags such as `<instant_penalties>` stay in English, because the docs and tests
   refer to them. The macros, the `<REFINED>` and `<REFINE_NOTES>` tags and the
   `[[AR1]]` tokens are unchanged. The tests that pinned English phrases now pin
   the Indonesian ones. The phrase lists keep their English examples, after the
   Indonesian ones, for a passage written in English. The paragraph about who a sex
   scene is between keeps its meaning and is quoted in `docs/prompt.md`.
5. **A new prompt block, "Bahasa Indonesia"**, added to the two built-in reply prompts
   (A judge, and A judge that thinks), right after The Finish and after Voice. It
   keeps the rewrite in Indonesian and in the register the passage already has,
   turns a denial plus its answer into the answer alone (with before and after
   pairs), cuts announcing and soothing lines, plain numbers, stock Indonesian
   phrases, and translated-sounding wording. The two line judges, for your own
   messages, do not get this block.
6. **`docs/two-models.md`**: the list of checks, kept identical to the code, as the
   test suite requires.

7. **Connection list refresh** (`src/frontend.ts`): the list of chat connections shown
   under **Refine using** is now asked for again when the Model tab opens and when
   the page comes back after being away. Before, it was read once at start, so a
   model changed on a connection in Lumiverse kept its old name in the list until
   the page was reloaded. Which connection a refine uses was never affected.

8. **Which connection a refine uses** (`src/backend.ts`): with **Refine using** left on
   the default, a chat that is set to its own connection now goes to that
   connection, read from the chat on every refine. Before, the connection used by
   the chat's last reply won, so a connection set on the chat after that reply was
   ignored until a new reply came. A chat set to none still follows the last reply's
   connection. A test covers it, and it fails on the old build.

9. **Second-model text in Indonesian**: besides `JUDGE_CHECKS`, the optional `MORE_CHECKS`, the
   comparison checks, the worn-phrases check, the text that tells the refine model
   what the checks found, and the note about protected formatting are in Indonesian
   (in `src/frontend.ts` and the copies in `src/backend.ts`). A reader who still holds the old
   English text is told, with a **Take it** button, through `MOVED_DEFAULTS`.
10. **Refresh connections button** (`src/frontend.ts`, `docs/settings.md`): a button on the
   Model tab, right under **Refine using**, that asks Lumiverse for the list of
   connections again and says how many it found. A browser check covers it.

The permissions and the version are the same as upstream. The
manifest and `package.json` point to this repository instead of upstream, and
`README.md` is in Indonesian.

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
