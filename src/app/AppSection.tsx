import type { CSSProperties } from "react";
import { LANGS, type App } from "@/content/apps";
import { SITE } from "@/content/site";
import { Arrow } from "./Arrow";
import { Film } from "./Film";
import styles from "./page.module.css";

/**
 * One app, in its own words and seen as it is: its name and part of the tree, its first line, its film, its intro page's
 * paragraphs, what it teaches and how it starts, and the way to it. The film runs the width, the words under it. An app
 * whose repo has made no film yet goes without one, and one not out yet says so where the way to it would be.
 */
export function AppSection({ app }: { app: App }) {
  return (
    <article id={app.id} className={app.media ? styles.app : `${styles.app} ${styles.appNoFilm}`}>
      <header className={styles.appHead} data-reveal>
        {/* eslint-disable-next-line @next/next/no-img-element -- the same small file as everywhere on the page */}
        <img src={`/apps/${app.id}.png`} alt="" width={64} height={64} />
        <div className={styles.appName}>
          <p className={styles.appKanji}>
            <b>{app.part}</b>
            {app.kanji}・{app.role}
          </p>
          <h3 className="wordmark-kana">{app.name}</h3>
        </div>
      </header>
      <p className={styles.appLead} data-reveal>
        {app.lead}
      </p>
      {app.media ? (
        <div className={styles.appMedia} data-reveal>
          <Film media={app.media} name={app.name} />
        </div>
      ) : null}
      <div className={styles.appBody}>
        {app.body.map((p, i) => (
          <p key={i} data-reveal style={{ "--i": i } as CSSProperties}>
            {p}
          </p>
        ))}
      </div>
      <div className={styles.appSide}>
        <dl className={styles.facts} data-reveal>
          <div>
            <dt>{SITE.facts.langs}</dt>
            <dd>
              {app.langs.map((l) => (
                <span key={l} className={styles.lang}>
                  {LANGS[l]}
                </span>
              ))}
            </dd>
          </div>
          <div>
            <dt>{SITE.facts.start}</dt>
            <dd>{app.start}</dd>
          </div>
        </dl>
        {app.url ? (
          <a href={app.url} className={`btn ${styles.appOpen}`} data-reveal>
            {SITE.open(app.name)}
            <Arrow />
          </a>
        ) : (
          <p className={styles.appSoon} data-reveal>
            {SITE.soon(app.name)}
          </p>
        )}
      </div>
    </article>
  );
}
