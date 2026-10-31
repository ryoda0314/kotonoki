@AGENTS.md

# ことのき

ことのき（言の木）is one page that introduces the eight sister apps as one tree: ことのあめ（雨）, ことのめ（芽）,
ことのは（葉）, ことのえだ（枝）, ことのみ（実）, ことのおと（音）, ことのかげ（影）and ことのね（根）. The maker named it on
2026-10-26; ことのみ and ことのかげ joined on 2026-10-30 (both names still 仮 in their CONCEPT.md). It says what each app
is in that app's own words, and links to it. It collects nothing, has no accounts and makes no calls.

## Stack

- Next.js 16 (App Router), React 19 and plain CSS modules, the same versions as the sisters. The page is static.
  `npm run dev` serves on port 3230. Deployed on Vercel, where Next.js takes the production address for the share
  image from `VERCEL_PROJECT_PRODUCTION_URL`, so `metadataBase` is not set. The local build warns about this; that is
  expected.
- The look is the sisters' (`src/app/globals.css`): paper, ink, one accent (ことのあめ's), and the names in the
  wordmark's mincho. No gradients or shadows; hairlines separate. The apps' own icons (`public/apps/`, each app's
  `icon-192.png`) are the only pictures with gradients.

## Motion

The site moves the apps' way: a thing falls a little way into its place (`--fall`, the apps'
cubic-bezier(0.2, 0.8, 0.3, 1), from 18 px above).

- `Scene.tsx`: the first picture, one 400 x 528 SVG.
  - ことのあめ's cloud rains the apps' own words (`src/content/rain.ts`, each from that app's intro page or
    CONCEPT.md). One word falls a second after the last, on a shared round.
  - The tree draws itself: ground, sprout, trunk, the tree's shadow along the ground a beat behind it, crown, branch,
    the fruit on its stem, the leaves' voice in rings, and the roots under the ground line. Each icon is a link to its
    card.
  - The shadow (影) sways as the leaves (葉) do, a beat behind them (`follows` in `NODES`): 影は、形に寄り添って同じように
    動く (ことのかげ's CONCEPT.md). Never a drop shadow.
- `Quiz.tsx`: 診断, between the first screen and the apps (the bar's 診断 and the first screen's 診断する lead there).
  - One question at a time, numbered in the mincho, its answers as wide plain buttons. ひとつ前へ goes back.
  - The answer: the app in its own words (`lead`, `about`, `start`), the way to it (or 準備中), its card, and あわせて.
  - Each step falls into place; the focus follows it once something is answered. Nothing is kept: a reload starts again.
- `AppSection.tsx`: one section per app, showing the app itself through the promo film its own repo made. An app
  without one yet goes without (`.appNoFilm`), and one not out yet says 準備中 where the way to it would be.
  - Order on a phone: its head, first line, film, intro paragraphs, what it teaches and how it starts, and the way to
    it.
  - From 960 px, the film runs the full width with the words under it.
- `Film.tsx`: the player.
  - It plays without sound while in view and stops out of view, and it loads only then (`preload="none"`).
  - Under the picture: the caption saying what it is, and sound on/off, from the start, and full screen.
  - With reduced motion it waits for a tap.
- `AppIndex.tsx`: the apps, held under the bar while they go by. The one being read is marked.
- `Motion.tsx` marks what is below the first screen (`data-reveal`) as waiting until it comes into view. What is
  already in view at load never waits, so nothing on screen blinks. It also stops the rain while the picture is out of
  view.
- Every animation only says where a thing comes from (fill `both`), and its resting state is the finished page. With
  reduced motion (`globals.css`) nothing moves and nothing waits: the tree is simply there, and only the words marked
  `rest` stay, none over another.

## Content

- `src/content/apps.ts`: the apps, in their own words.
  - `lead`: the first line of each app's intro page. ことのね's comes from its CONCEPT.md.
  - `about`: each app's meta description.
  - `body`: the paragraphs of each app's intro page. ことのね's come from its intro copy and the facts in its CONCEPT.md.
  - `start`: how each app is started, as its intro page says.
  - `part` and `role`: from the sisters' table in ことのめ's CONCEPT.md. ことのえだ, ことのみ and ことのかげ came after
    that table, so theirs are from their own CONCEPT.md.
  - `url`: each app's live address. ことのみ has none yet, so its card and the footer say 準備中 instead of linking
    to it. Once it is out, check its live site and add it (`kotonomi.vercel.app` is someone else's site).
  - `media`: the app itself, seen: the promo film its own repo made (`../kotono/<repo>/promo`), with its `label`.
    - Never a redrawing or a screen recording of the app.
    - ことのみ and ことのかげ have no film yet, so they have no `media`.
  - When an app changes its words or its address, change them here too.
  - Their order is the tree as it grows: rain, sprout, leaves, the branch and the fruit it bears, the voice the leaves
    become and the shadow that follows it, then the roots under the ground line. The cards, the footer and the share image follow it; the first picture places each on the
    tree (`NODES` in `Scene.tsx`).
- `src/content/quiz.ts`: 診断's questions, in the page's own words. Two or three questions, first the language.
  - An answer that ends them names the app whose own CONCEPT.md or intro page says it is for that learner (its
    audience, in the learner's words: ことのね's 「覚えても覚えても、読める語が増えない」, ことのえだ's 반말 with friends
    but nothing for those above, and so on). Every app is reached by some path.
  - `also` (あわせて) names a sister only where the two apps' CONCEPT.md pair them; `why` says how, in a line. The
    line it comes from is noted beside each.
  - When an app is added or says it is for someone else, change the questions too, and walk every path again.
- `src/content/site.ts`: the page's own words, plain, from the learner's side.
  - A principle under どのアプリにも共通すること is listed only when every app's CONCEPT.md states it: from Japanese,
    with sound, no scores, ranking, badges or streaks, and no forced review. Check every app's before adding one or
    changing its words (what comes back does so 日をあけて in all eight; only some bring it back in other words).
  - Accounts: ことのあめ needs one. ことのめ, ことのは, ことのえだ, ことのみ, ことのおと and ことのかげ work without signing
    in and take ことのあめ's accounts (ことのみ's as its intro page says; its CONCEPT.md of 10-29 still has it open).
    ことのね has none and stays on the device.
- A link to another app is checked on the live site before it is added (`curl -sL -o /dev/null -w '%{http_code}'`).

## Images

- `python scripts/make-images.py` (Pillow) draws the following from the apps' icons and the sisters' type:
  - `src/app/icon.png` and `apple-icon.png`: a stand-in 木 in the wordmark's mincho, until the maker chooses a
    picture as they did for the first six.
  - `src/app/opengraph-image.png` and its alt text.
- The script fetches the fonts into `scripts/.fonts/` (not in git). If the download is refused, it says which file to
  save where.

## Films (`public/films`)

`node scripts/films/make.mjs` makes each `<app>.mp4` and its cover `<app>.jpg`.

- Each comes from its app's own promo film, `../kotono/<repo>/promo/out/<app>-promo.mp4`:
  - ことのは: `english` (its promo is in `public/promo`, and the film is `kotonoha-promo-narration.mp4`)
  - ことのめ: `hangul`
  - ことのえだ: `keigo`
  - ことのね: `hanjaatume`
  - ことのおと: `chinese`
  - ことのあめ: `polylinga`
  - ことのみ (`taiping`) and ことのかげ (`eng-sha`) have none yet. When their repos make one, add it to `FILMS` and
    give the app its `media`.
- It is made 720p with its sound, and its cover frame is the second `FILMS` names.
- It needs the sister repos in `../kotono` and an ffmpeg with libx264 (`FFMPEG`, by default Remotion's in
  `../kotono/english/public/promo`).
- When an app's film is made again in its repo, run it again.

## Commands

- `npm run dev` / `npm run build` / `npm run lint`
- `npx tsc --noEmit` (run `npx next typegen` first after adding routes)
- `python scripts/make-images.py`
- `node scripts/films/make.mjs` (needs the sister repos in `../kotono` and ffmpeg)
