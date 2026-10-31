"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { Media } from "@/content/apps";
import { SITE } from "@/content/site";
import styles from "./film.module.css";

const reducedQuery = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (on: () => void) => {
  const m = matchMedia(reducedQuery);
  m.addEventListener("change", on);
  return () => m.removeEventListener("change", on);
};

/**
 * The app itself, seen: the film made for it in its own repo. It plays without sound while in view and stops out of it,
 * and loads only then. Sound, from the start and full screen are a tap away. With reduced motion it waits to be played.
 */
export function Film({ media, name }: { media: Media; name: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const reduced = useSyncExternalStore(subscribeReduced, () => matchMedia(reducedQuery).matches, () => false);

  useEffect(() => {
    const video = ref.current;
    if (!video || reduced) return;
    const io = new IntersectionObserver(
      ([e]) => {
        // Once someone has turned the sound on, it is theirs to stop; only a silent one comes and goes by itself.
        if (e.isIntersecting && video.muted) void video.play().catch(() => {});
        else if (!e.isIntersecting) video.pause();
      },
      { threshold: 0.4 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [reduced]);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) void video.play().catch(() => {});
    else video.pause();
  };
  const sound = () => {
    const video = ref.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
    if (!video.muted && video.paused) void video.play().catch(() => {});
  };
  const restart = () => {
    const video = ref.current;
    if (!video) return;
    video.currentTime = 0;
    void video.play().catch(() => {});
  };
  const full = () => {
    const video = ref.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    if (!video) return;
    if (video.requestFullscreen) void video.requestFullscreen().catch(() => {});
    else video.webkitEnterFullscreen?.();
  };

  return (
    <figure className={styles.film}>
      <div className={styles.frame}>
        <video
          ref={ref}
          src={media.src}
          poster={media.poster}
          muted
          loop
          playsInline
          preload="none"
          aria-label={media.label}
          onClick={toggle}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
        {!playing ? (
          <button type="button" className={styles.big} onClick={toggle} aria-label={SITE.film.play(name)}>
            <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
              <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
            </svg>
          </button>
        ) : null}
      </div>
      <div className={styles.under}>
        <figcaption className={styles.caption}>{media.label}</figcaption>
        <div className={styles.controls}>
          <button type="button" onClick={sound} aria-pressed={!muted} aria-label={muted ? SITE.film.soundOn : SITE.film.soundOff}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M11 5 6 9H3v6h3l5 4z" />
              {muted ? <path d="M16 9.5l5 5M21 9.5l-5 5" /> : <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />}
            </svg>
            <span>{muted ? SITE.film.soundOn : SITE.film.soundOff}</span>
          </button>
          <button type="button" onClick={restart} aria-label={SITE.film.restart}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 12a8 8 0 1 0 2.4-5.7" />
              <path d="M4 4v4.5h4.5" />
            </svg>
          </button>
          <button type="button" onClick={full} aria-label={SITE.film.full}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
            </svg>
          </button>
        </div>
      </div>
    </figure>
  );
}
