// The page's own words, plain, from the learner's side. Each app's words are in apps.ts, taken from the app itself.

export const SITE = {
  name: "ことのき",
  kanji: "言の木",
  description:
    "日本語を話す人が、外国語を「勉強する言葉」から「使う言葉」にしていくための8つのアプリ。雨・芽・葉・根・枝・音・実・影が、一本の木になる。",

  nav: { quiz: "診断", apps: "アプリ", shared: "共通すること", account: "アカウント", origin: "はじまり" },

  lead: "外国語を「使う言葉」にしていく、8つのアプリ。",
  /** The same, in the phrases it falls in by (and wraps between). */
  leadPhrases: ["外国語を", "「使う言葉」に", "していく、", "8つのアプリ。"],
  kanaJo: "人の心を種として、よろづの言の葉とぞなれりける",
  kanaJoFrom: "古今和歌集 仮名序",
  body: [
    "心を種に、言の葉が育つ。ことのき の8つのアプリは、その木のそれぞれのところを受け持っています。",
    "雨が降り、芽が出て、葉が茂る。枝は上へ伸びて実をつけ、育った言の葉は、やがて声になって通じる。その声に、影のように自分の声が重なる。根は土の中で、葉どうしをつないでいる。",
  ],
  start: "アプリを見る",
  // To 診断 (src/content/quiz.ts), just below.
  startQuiz: "診断する",
  treeLabel: "8つのアプリが受け持つところ",

  apps: "8つのアプリ",
  appsLead: "どれも日本語から。英語なら ことのは・ことのみ・ことのかげ、中国語なら ことのおと、韓国語なら ことのめ・ことのね・ことのえだ。ことのあめ は3つとも。",
  indexLabel: "アプリへ移る",
  facts: { langs: "学ぶことば", start: "はじめかた" },
  open: (name: string) => `${name}をひらく`,
  // In place of the way to it, for an app that is not out yet.
  soon: (name: string) => `${name}は準備中です`,
  soonShort: "準備中",
  film: {
    play: (name: string) => `${name}の映像を再生`,
    soundOn: "音を出す",
    soundOff: "音を消す",
    restart: "最初から",
    full: "全画面",
  },

  shared: "どのアプリにも共通すること",
  principles: [
    { title: "日本語から", text: "どのアプリも、日本語を話す人のために作っています。" },
    { title: "音といっしょに", text: "文字だけでなく、語や文の音を聞きながら出会います。" },
    {
      title: "点数を付けない",
      text: "点数・ランキング・バッジ・連続記録はありません。数は自分のためだけで、ほかの人とは比べません。",
    },
    { title: "復習を強いない", text: "出会ったものは、日をあけて、また向こうからやってきます。" },
  ],

  oneAccount: "アカウントは一つ",
  oneAccountBody: [
    "ことのあめ でつくったアカウントは、ことのめ・ことのは・ことのえだ・ことのみ・ことのおと・ことのかげ でもそのまま使えます。",
    "この6つはログインしなくても使え、ログインすると記録がアカウントにも残って、スマホでもパソコンでも続きから使えます。ことのね はアカウントを使わず、端末の中だけで動きます。",
  ],
  // ことのあめ's login page, which opens on ログイン with 新しく登録 beside it.
  makeAccount: "ことのあめで登録・ログインする",
  makeAccountUrl: "https://polylinga.vercel.app/login",

  origin: "はじまり",
  originBody:
    "どのアプリも、作った人が韓国語を1年で「勉強する言葉」から「使う言葉」にした体験から生まれました。字の覚え方も、音が聞き分けられるようになった日のことも、そこに書いてあります。",
  originLink: "その体験を書いた note を読む",
  // From the note, as ことのおと's CONCEPT.md quotes it.
  originQuote: "知識として違いを知ることと、本当に耳で別の音として聞こえることは全く違った。",
  originQuoteFrom: "作った人の note より",

  notFound: "このページは見つかりませんでした",
  notFoundLead: "URL が変わったか、削除されたページです。",
  home: "ことのき へ",
} as const;
