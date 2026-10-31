import type { CSSProperties } from "react";
import { APPS, NOTE_URL } from "@/content/apps";
import { QUIZ } from "@/content/quiz";
import { SITE } from "@/content/site";
import { AppIndex } from "./AppIndex";
import { AppSection } from "./AppSection";
import { Arrow } from "./Arrow";
import { Motion } from "./Motion";
import { Quiz } from "./Quiz";
import { Scene } from "./Scene";
import styles from "./page.module.css";

const NUMERALS = ["一", "二", "三", "四"];
const order = (i: number) => ({ "--i": i }) as CSSProperties;

/** ことのき: the apps as one tree, a few questions to find the one to open first, each in its own words, and a way to each that is out. */
export default function Home() {
  return (
    <>
      <header className={styles.bar}>
        <div className={styles.barIn}>
          <a href="#" className={styles.brand}>
            <span className={`wordmark-kana ${styles.brandName}`}>{SITE.name}</span>
            <span className={styles.brandKanji}>{SITE.kanji}</span>
          </a>
          <nav className={styles.nav} aria-label={SITE.name}>
            <a href="#shindan">{SITE.nav.quiz}</a>
            <a href="#apps">{SITE.nav.apps}</a>
            <a href="#shared">{SITE.nav.shared}</a>
            <a href="#account">{SITE.nav.account}</a>
            <a href="#origin">{SITE.nav.origin}</a>
          </nav>
        </div>
      </header>

      <div className={styles.page}>
        <main>
          <section className={styles.hero}>
            {/* Said whole to a screen reader; on screen it falls in phrase by phrase, and wraps only between them. */}
            <h1 className={styles.lead} aria-label={SITE.lead}>
              {SITE.leadPhrases.map((p, i) => (
                <span key={p} aria-hidden="true" style={order(i)}>
                  {p}
                </span>
              ))}
            </h1>
            <div className={styles.sceneArea}>
              <Scene />
            </div>
            <div className={styles.heroText}>
              <blockquote className={styles.quote} style={order(0)}>
                <p>{SITE.kanaJo}</p>
                <cite>{SITE.kanaJoFrom}</cite>
              </blockquote>
              <p className={styles.body} style={order(1)}>
                {SITE.body[0]}
              </p>
              <div className={styles.actions} style={order(2)}>
                <a href="#apps" className={`btn ${styles.start}`}>
                  {SITE.start}
                  <span className={styles.down}>
                    <Arrow />
                  </span>
                </a>
                <a href="#shindan" className={`btn-quiet ${styles.startQuiz}`}>
                  {SITE.startQuiz}
                  <span className={styles.down}>
                    <Arrow />
                  </span>
                </a>
              </div>
            </div>
          </section>

          <section id="shindan" className={`${styles.section} ${styles.quizSection}`}>
            <div className={styles.head} data-reveal>
              <h2 className={styles.h2}>{QUIZ.title}</h2>
              <p className={styles.sectionLead}>{QUIZ.lead}</p>
            </div>
            <Quiz />
          </section>

          <section id="apps" className={styles.apps}>
            <div className={styles.head} data-reveal>
              <h2 className={styles.h2}>{SITE.apps}</h2>
              <p className={styles.sectionLead}>{SITE.appsLead}</p>
            </div>
            <AppIndex />
            {APPS.map((a) => (
              <AppSection key={a.id} app={a} />
            ))}
          </section>

          <section id="shared" className={styles.section}>
            <h2 className={styles.h2} data-reveal>
              {SITE.shared}
            </h2>
            <ol className={styles.principles}>
              {SITE.principles.map((p, i) => (
                <li key={p.title} data-reveal style={order(i)}>
                  <span className={styles.numeral} aria-hidden="true">
                    {NUMERALS[i]}
                  </span>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </li>
              ))}
            </ol>
          </section>

          <div className={styles.pair}>
            <section id="account" className={styles.section}>
              <h2 className={styles.h2} data-reveal>
                {SITE.oneAccount}
              </h2>
              <Wires />
              {SITE.oneAccountBody.map((p, i) => (
                <p key={p} className={styles.text} data-reveal style={order(i)}>
                  {p}
                </p>
              ))}
              <a href={SITE.makeAccountUrl} className={styles.textLink} data-reveal>
                {SITE.makeAccount}
                <Arrow />
              </a>
            </section>

            <section id="origin" className={styles.section}>
              <h2 className={styles.h2} data-reveal>
                {SITE.origin}
              </h2>
              <blockquote className={styles.pull} data-reveal>
                <p>{SITE.originQuote}</p>
                <cite>{SITE.originQuoteFrom}</cite>
              </blockquote>
              <p className={styles.text} data-reveal>
                {SITE.originBody}
              </p>
              <a href={NOTE_URL} className={styles.textLink} data-reveal>
                {SITE.originLink}
                <Arrow />
              </a>
            </section>
          </div>
        </main>

        <footer className={styles.footer}>
          <span className={styles.brand}>
            <span className={`wordmark-kana ${styles.brandName}`}>{SITE.name}</span>
            <span className={styles.brandKanji}>{SITE.kanji}</span>
          </span>
          <ul className={styles.footerApps}>
            {APPS.map((a) => {
              const inner = (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element -- the same small file as everywhere on the page */}
                  <img src={`/apps/${a.id}.png`} alt="" width={28} height={28} />
                  <span className="wordmark-kana">{a.name}</span>
                </>
              );
              return (
                <li key={a.id}>
                  {a.url ? (
                    <a href={a.url}>{inner}</a>
                  ) : (
                    <span className={styles.footerSoon}>
                      {inner}
                      <small>{SITE.soonShort}</small>
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </footer>
      </div>

      <Motion />
    </>
  );
}

/** One account: ことのあめ's, drawn to the apps that take it as it comes into view, spread evenly under it. */
function Wires() {
  const to = APPS.filter((a) => a.account === "optional");
  const x = (i: number) => 30 + (i * 260) / (to.length - 1);
  return (
    <svg viewBox="0 0 320 150" className={styles.wires} aria-hidden="true" data-reveal>
      {to.map((a, i) => (
        <path key={a.id} d={`M160 62 C160 88 ${x(i)} 76 ${x(i)} 102`} pathLength={1} className={styles.wire} style={order(i)} />
      ))}
      <image href="/apps/kotonoame.png" x={132} y={2} width={56} height={56} />
      {to.map((a, i) => (
        <image key={a.id} href={`/apps/${a.id}.png`} x={x(i) - 20} y={104} width={40} height={40} />
      ))}
    </svg>
  );
}
