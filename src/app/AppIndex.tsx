"use client";

import { useEffect, useState } from "react";
import { APPS } from "@/content/apps";
import { SITE } from "@/content/site";
import styles from "./page.module.css";

/**
 * The apps, held under the bar while they go by: the one being read is marked (its name shows where room is short),
 * and each is a way to its own section.
 */
export function AppIndex() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    // The one crossing the middle of the screen is the one being read.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const a of APPS) {
      const el = document.getElementById(a.id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, []);

  return (
    <nav className={styles.index} aria-label={SITE.indexLabel}>
      <ul>
        {APPS.map((a) => (
          <li key={a.id}>
            <a href={`#${a.id}`} aria-current={active === a.id ? "true" : undefined}>
              {/* eslint-disable-next-line @next/next/no-img-element -- the same small file as everywhere on the page */}
              <img src={`/apps/${a.id}.png`} alt="" width={26} height={26} />
              <span className="wordmark-kana">{a.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
