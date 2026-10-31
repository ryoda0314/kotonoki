"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { appById } from "@/content/apps";
import { QUESTIONS, QUIZ, type Answer } from "@/content/quiz";
import { SITE } from "@/content/site";
import { Arrow } from "./Arrow";
import styles from "./page.module.css";

const NUMERALS = ["一", "二", "三", "四"];
const order = (i: number) => ({ "--i": i }) as CSSProperties;

/**
 * 診断: one question at a time, its answers as wide plain buttons, until one names the app to open first, in its own
 * words, with a sister to go with it. Each step falls into place as things do in the apps, and the focus follows it for
 * whoever answers by keyboard or screen reader. Nothing is kept: a reload starts again.
 */
export function Quiz() {
  const [answers, setAnswers] = useState<number[]>([]);
  const heading = useRef<HTMLHeadingElement>(null);
  const answered = useRef(false);

  // From the first question, along the answers so far: to the next question, or to the end.
  let id = QUIZ.first;
  let end: Answer | null = null;
  for (const a of answers) {
    const c = QUESTIONS[id].choices[a];
    if ("next" in c) id = c.next;
    else end = c;
  }
  const step = answers.length;

  // Not when the page opens: only once something has been answered.
  useEffect(() => {
    if (answered.current) heading.current?.focus();
  }, [step]);

  const go = (next: number[]) => {
    answered.current = true;
    setAnswers(next);
  };

  if (end) {
    const app = appById(end.app);
    const also = end.also ? { app: appById(end.also.app), why: end.also.why } : null;
    return (
      <div className={styles.quiz} data-reveal>
        <div key="end" className={styles.step}>
          <p className={styles.answered}>{QUIZ.answered(end.label)}</p>
          <div className={styles.found}>
            {/* eslint-disable-next-line @next/next/no-img-element -- the same small file as everywhere on the page */}
            <img src={`/apps/${app.id}.png`} alt="" width={72} height={72} />
            <div className={styles.appName}>
              <p className={styles.appKanji}>
                <b>{app.part}</b>
                {app.kanji}・{app.role}
              </p>
              <h3 ref={heading} tabIndex={-1} className="wordmark-kana">
                {app.name}
              </h3>
            </div>
          </div>
          <p className={styles.foundLead}>{app.lead}</p>
          <p className={styles.foundAbout}>{app.about}</p>
          <p className={styles.foundStart}>{app.start}</p>
          <div className={styles.ways}>
            {app.url ? (
              <a href={app.url} className={`btn ${styles.appOpen}`}>
                {SITE.open(app.name)}
                <Arrow />
              </a>
            ) : (
              <p className={styles.appSoon}>{SITE.soon(app.name)}</p>
            )}
            <a href={`#${app.id}`} className={styles.textLink}>
              {QUIZ.see(app.name)}
              <Arrow />
            </a>
          </div>
          {also ? (
            <a href={`#${also.app.id}`} className={styles.also}>
              {/* eslint-disable-next-line @next/next/no-img-element -- the same small file as everywhere on the page */}
              <img src={`/apps/${also.app.id}.png`} alt="" width={44} height={44} />
              <span className={styles.alsoText}>
                <span className={styles.alsoHead}>
                  <small>{QUIZ.also}</small>
                  <b className="wordmark-kana">{also.app.name}</b>
                </span>
                <span>{also.why}</span>
              </span>
              <Arrow />
            </a>
          ) : null}
          <button type="button" className={styles.quizBack} onClick={() => go([])}>
            {QUIZ.again}
          </button>
        </div>
      </div>
    );
  }

  const q = QUESTIONS[id];
  return (
    <div className={styles.quiz} data-reveal>
      <div key={`${step}-${id}`} className={styles.step}>
        <p className={styles.stepNumeral} aria-hidden="true">
          {NUMERALS[step]}
        </p>
        <h3 ref={heading} tabIndex={-1} className={styles.question}>
          {q.text}
        </h3>
        <ul className={styles.choices}>
          {q.choices.map((c, i) => (
            <li key={c.label} style={order(i)}>
              <button type="button" className={styles.choice} onClick={() => go([...answers, i])}>
                <span>{c.label}</span>
                <Arrow />
              </button>
            </li>
          ))}
        </ul>
        {step > 0 ? (
          <button type="button" className={styles.quizBack} onClick={() => go(answers.slice(0, -1))}>
            {QUIZ.back}
          </button>
        ) : null}
      </div>
    </div>
  );
}
