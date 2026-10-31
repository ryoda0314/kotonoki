// The apps themselves, for the page: each app's own promo film, the one its repo made (../kotono/<repo>/promo/out), made small
// enough for the web with its sound kept, and a cover frame. Nothing here is redrawn or recorded.
//   node scripts/films/make.mjs
// Needs the sister repos in ../kotono and an ffmpeg with libx264 (FFMPEG, or Remotion's in ../kotono/english/public/promo).
// Writes public/films/<app>.mp4 and its cover <app>.jpg. Run it again whenever an app's film is made again.
import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "../..");
const OUT = join(ROOT, "public/films");
const SISTERS = resolve(ROOT, "../kotono");
const FFMPEG = process.env.FFMPEG ?? resolve(SISTERS, "english/public/promo/node_modules/@remotion/compositor-win32-x64-msvc/ffmpeg.exe");
const ff = (...args) => execFileSync(FFMPEG, ["-v", "error", "-y", ...args], { stdio: "inherit" });
mkdirSync(OUT, { recursive: true });

/** The films the apps' own repos made (in ../kotono), with the second (in seconds) their cover is taken from. */
const FILMS = {
  kotonoha: { from: "english/public/promo/out/kotonoha-promo-narration.mp4", cover: 40 },
  kotonome: { from: "hangul/promo/out/kotonome-promo.mp4", cover: 64 },
  kotonoeda: { from: "keigo/promo/out/kotonoeda-promo.mp4", cover: 60 },
  kotonone: { from: "hanjaatume/promo/out/kotonone-promo.mp4", cover: 40 },
  kotonooto: { from: "chinese/promo/out/kotonooto-promo.mp4", cover: 48 },
  kotonoame: { from: "polylinga/promo/out/kotonoame-promo.mp4", cover: 22 },
};

function films() {
  for (const [id, { from, cover }] of Object.entries(FILMS)) {
    const src = resolve(SISTERS, from);
    // 720p, small enough to start at once, the sound kept for whoever turns it on.
    ff("-i", src, "-vf", "scale=1280:-2", "-c:v", "libx264", "-preset", "slow", "-crf", "27", "-pix_fmt", "yuv420p", "-profile:v", "high", "-movflags", "+faststart", "-c:a", "aac", "-b:a", "96k", "-ac", "2", join(OUT, `${id}.mp4`));
    ff("-ss", String(cover), "-i", src, "-frames:v", "1", "-vf", "scale=1280:-2", "-q:v", "4", join(OUT, `${id}.jpg`));
    console.log(`films: ${id}`);
  }
}

films();
