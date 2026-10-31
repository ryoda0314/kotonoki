"use client";

import { useEffect } from "react";

/**
 * Things further down the page (`data-reveal`) fall into place as they come into view, as lines fall in in the apps.
 * Only what is out of view when the page opens waits (`data-waiting`), so nothing on screen blinks; with reduced motion
 * nothing waits at all. The first picture's falling words stop while it is out of view.
 */
export function Motion() {
  useEffect(() => {
    const scene = document.querySelector<HTMLElement>("[data-scene]");
    const still = new IntersectionObserver(([e]) => scene?.toggleAttribute("data-still", !e.isIntersecting));
    if (scene) still.observe(scene);

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return () => still.disconnect();
    const reveal = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.setAttribute("data-shown", "");
          reveal.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -6% 0px" },
    );
    for (const el of document.querySelectorAll<HTMLElement>("[data-reveal]")) {
      const r = el.getBoundingClientRect();
      if (r.top < innerHeight && r.bottom > 0) continue;
      el.setAttribute("data-waiting", "");
      reveal.observe(el);
    }
    return () => {
      still.disconnect();
      reveal.disconnect();
    };
  }, []);
  return null;
}
