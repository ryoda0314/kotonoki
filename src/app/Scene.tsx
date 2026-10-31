import type { CSSProperties } from "react";
import { appById } from "@/content/apps";
import { DROPS, RAIN_CYCLE } from "@/content/rain";
import { SITE } from "@/content/site";
import styles from "./scene.module.css";

// The first picture: ことのあめ's cloud rains the apps' own words onto a tree that draws itself as the page opens.
// The sprout comes up from the ground, the trunk grows to the crown of leaves, a branch reaches out and a fruit hangs
// from it, the leaves' voice spreads in rings, the tree's shadow follows it along the ground, and the roots go down under
// the ground line. All of it is in one 400 x 528 drawing, so it scales as one; each icon is a way to its app below. With
// reduced motion everything is simply there, the words resting mid-fall.

const SIZE = 56;
/**
 * Where each icon stands, where its name goes, and when it falls into place (seconds after the page opens). One that
 * `follows` another sways as it does, a beat behind: the shadow, with the leaves.
 */
const NODES: { id: string; x: number; y: number; label: "right" | "below" | "left"; at: number; follows?: string }[] = [
  { id: "kotonoame", x: 172, y: 6, label: "right", at: 0.1 },
  { id: "kotonome", x: 44, y: 352, label: "right", at: 1 },
  { id: "kotonoha", x: 172, y: 166, label: "right", at: 1.8 },
  { id: "kotonoeda", x: 318, y: 214, label: "below", at: 2.3 },
  { id: "kotonomi", x: 223, y: 306, label: "right", at: 2.6 },
  { id: "kotonooto", x: 38, y: 194, label: "below", at: 2.5 },
  { id: "kotonokage", x: 318, y: 352, label: "left", at: 2.5, follows: "kotonoha" },
  { id: "kotonone", x: 172, y: 458, label: "right", at: 2.9 },
];
const swayOf = (i: number) => 4.4 + (i % 3) * 0.8;
/** How far behind the one it follows a follower sways. */
const LAG = 0.4;

/** Lines that draw themselves: when, and for how long. */
const LINES: { d: string; at: number; t: number; kind?: "root" | "shadow" }[] = [
  { d: "M16 410 H384", at: 0.5, t: 0.9 },
  { d: "M200 410 C196 370 205 330 200 290 S199 240 200 220", at: 1.2, t: 0.8 },
  // The tree's shadow along the ground, drawn a beat behind the trunk.
  { d: "M206 416 H368", at: 1.6, t: 0.8, kind: "shadow" },
  { d: "M200 300 C232 296 282 280 320 244", at: 1.9, t: 0.5 },
  // The fruit's stem, from the middle of the branch.
  { d: "M251 287 V306", at: 2.4, t: 0.25 },
  { d: "M200 410 C194 426 176 436 148 440 S104 446 82 456", at: 2.2, t: 0.8, kind: "root" },
  { d: "M200 410 C206 426 224 436 252 440 S296 444 318 452", at: 2.3, t: 0.8, kind: "root" },
  { d: "M200 410 V458", at: 2.2, t: 0.4, kind: "root" },
  { d: "M148 440 C140 452 136 466 138 482", at: 2.7, t: 0.5, kind: "root" },
  { d: "M104 446 C96 458 92 472 94 488", at: 2.8, t: 0.5, kind: "root" },
  { d: "M252 440 C262 450 266 458 264 466", at: 2.8, t: 0.4, kind: "root" },
];

/** The leaves' voice: rings from the crown towards ことのおと. */
const RINGS = [48, 64, 80].map((r) => {
  const dx = (r * 0.9397).toFixed(1);
  const dy = (r * 0.342).toFixed(1);
  return `M${(200 - +dx).toFixed(1)} ${(194 - +dy).toFixed(1)} A${r} ${r} 0 0 0 ${(200 - +dx).toFixed(1)} ${(194 + +dy).toFixed(1)}`;
});

const at = (s: number, extra?: Record<string, string>) => ({ "--at": `${s}s`, ...extra }) as CSSProperties;

/** Its sway: its own pace, or the pace of the one it follows, a beat behind. */
function sway(n: (typeof NODES)[number], i: number) {
  const j = n.follows ? NODES.findIndex((m) => m.id === n.follows) : i;
  const lead = NODES[j];
  return { "--sway": `${swayOf(j)}s`, "--sway-at": `${+(lead.at + 0.9 + (n.follows ? LAG : 0)).toFixed(2)}s` };
}

export function Scene() {
  return (
    <figure className={styles.scene} aria-label={SITE.treeLabel} data-scene>
      <svg viewBox="0 0 400 528" className={styles.svg}>
        <g aria-hidden="true">
          {LINES.map((l) => (
            <path key={l.d} d={l.d} pathLength={1} className={l.kind ? `${styles.line} ${styles[l.kind]}` : styles.line} style={at(l.at, { "--t": `${l.t}s` })} />
          ))}
          {RINGS.map((d, i) => (
            <path key={d} d={d} className={styles.ring} style={at(2.7 + i * 0.8)} />
          ))}
          {DROPS.map((drop, i) => (
            <text
              key={drop.text}
              x={drop.x}
              y={drop.y}
              textAnchor="middle"
              className={`${styles.drop} ${styles[`tone${i % 3}`]}${drop.rest ? ` ${styles.rest}` : ""}`}
              style={at(0.6 + i * (RAIN_CYCLE / DROPS.length), { "--cycle": `${RAIN_CYCLE}s`, "--from": `${72 - drop.y}px`, "--to": `${158 - drop.y}px` })}
            >
              {drop.text}
            </text>
          ))}
        </g>
        {NODES.map((n, i) => {
          const a = appById(n.id);
          return (
            <a key={n.id} href={`#${n.id}`} className={styles.node} style={at(n.at, sway(n, i))} aria-label={`${a.part} ${a.name}`}>
              <rect x={n.x - 4} y={n.y - 4} width={SIZE + 8} height={SIZE + 8} rx={16} className={styles.focus} />
              <image href={`/apps/${n.id}.png`} x={n.x} y={n.y} width={SIZE} height={SIZE} className={styles.pic} />
              <text
                x={n.label === "below" ? n.x + SIZE / 2 : n.label === "left" ? n.x - 8 : n.x + SIZE + 8}
                y={n.label === "below" ? n.y + SIZE + 20 : n.y + SIZE / 2 + 5}
                textAnchor={n.label === "below" ? "middle" : n.label === "left" ? "end" : "start"}
                className={styles.label}
              >
                <tspan className={styles.part}>{a.part}</tspan>
                <tspan dx={6}>{a.name}</tspan>
              </text>
            </a>
          );
        })}
      </svg>
      <figcaption className={styles.caption}>{SITE.body[1]}</figcaption>
    </figure>
  );
}
