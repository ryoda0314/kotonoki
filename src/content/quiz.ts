// 診断: a few questions, and the app to open first. The page's own words, plain, from the learner's side.
// - An answer that ends the questions names the app whose own CONCEPT.md or intro page says it is for that learner:
//   ことのめ, Hangul not read yet; ことのえだ, 반말 with friends but no words for those above; ことのね, words learned one
//   by one that do not add up; ことのは, English read but not there when speaking or writing; ことのかげ, English not
//   caught at its own pace nor answered on the spot; ことのみ, TOEIC・TOEFL words; ことのおと, tones and pinyin;
//   ことのあめ, sentences that do not come.
// - `also`: a sister to go with it, only where their CONCEPT.md pair the two, and why, in a line.
// Nothing answered here is kept or sent anywhere.

export type QuestionId = "lang" | "koRead" | "ko" | "en" | "enWay" | "zh";
export type Also = { app: string; why: string };
export type Choice = { label: string } & ({ next: QuestionId } | { app: string; also?: Also });
/** A choice that ends the questions. */
export type Answer = Extract<Choice, { app: string }>;
export type Question = { text: string; choices: Choice[] };

export const QUIZ = {
  title: "あなたに必要なアプリはどれ？",
  lead: "2つか3つの質問に答えると、いまのあなたに合うアプリを選びます。答えは、どこにも送りません。",
  first: "lang" as QuestionId,
  back: "ひとつ前へ",
  again: "もう一度",
  answered: (label: string) => `「${label}」なら`,
  see: (name: string) => `${name}の紹介を見る`,
  also: "あわせて",
};

export const QUESTIONS: Record<QuestionId, Question> = {
  lang: {
    text: "いちばん使えるようにしたいことばは？",
    choices: [
      { label: "韓国語", next: "koRead" },
      { label: "英語", next: "en" },
      { label: "中国語", next: "zh" },
    ],
  },
  koRead: {
    text: "ハングルは読めますか？",
    choices: [
      {
        label: "まだ読めない字がある",
        app: "kotonome",
        // ことのめ's CONCEPT.md: ことのあめ では似た文を並べて共通する「かたち」に気づく。ことのめ では…共通する「字」に気づく。
        also: { app: "kotonoame", why: "字が読めたら、次は文。ことのあめ では、似た文に共通する「かたち」に気づきます。" },
      },
      { label: "だいたい読める", next: "ko" },
    ],
  },
  ko: {
    text: "いまのあなたに、いちばん近いのは？",
    choices: [
      {
        label: "言いたい文が、すぐに出てこない",
        app: "kotonoame",
        // ことのね's: ことのあめ で浴びた文の中の漢字語を、ことのね で根から見る。
        also: { app: "kotonone", why: "浴びた文の中の漢字語は、ことのね で漢字の根からつなげます。" },
      },
      {
        label: "友だちとは話せるのに、目上の人の前だと言葉が出てこない",
        app: "kotonoeda",
        // ことのえだ's: ことのあめ で育った반말の言の葉に、目上の人へ向けた上の枝を足す。
        also: { app: "kotonoame", why: "友だちとのことばを育てるのは ことのあめ。ことのえだ は、そこに目上の人への枝を足します。" },
      },
      {
        label: "単語を覚えても覚えても、読める語が増えない",
        app: "kotonone",
        // ことのね's: ことのね で根を知った語は、ことのあめ の雨の中でまた出会う。
        also: { app: "kotonoame", why: "根を知った語に、ことのあめ の文の中でまた出会えます。" },
      },
    ],
  },
  en: {
    text: "英語で、いちばん困るのは？",
    choices: [
      { label: "読めば分かるのに、話す・書くときに出てこない", next: "enWay" },
      {
        label: "ふつうの速さの会話が聞き取れず、その場で返せない",
        app: "kotonokage",
        // ことのかげ's: ことのかげ で口になじんだまとまりは、ことのは の会話で自分から使える。
        also: { app: "kotonoha", why: "口になじんだまとまりは、ことのは の会話で自分から使えます。" },
      },
      { label: "TOEIC・TOEFL の単語が、なかなか覚えられない", app: "kotonomi" },
    ],
  },
  enWay: {
    text: "どんなふうに身につけたい？",
    choices: [
      {
        label: "似た文をたくさん聞いて、共通するかたちに自分で気づきたい",
        app: "kotonoame",
        // ことのは's: その最後のところ、借りた表現が自分の意図で使える言葉になるところを、英語でやる。
        also: { app: "kotonoha", why: "借りた表現が、自分の言いたいことで使える言葉になるところは、ことのは が受け持ちます。" },
      },
      {
        label: "言いたいことを言ってみて、直してもらいたい",
        app: "kotonoha",
        // ことのかげ's: ことのは で自分の意図を英語にできたまとまりが、ことのかげ で声になる。
        also: { app: "kotonokage", why: "ことのは で言えたまとまりは、ことのかげ で声になります。" },
      },
    ],
  },
  zh: {
    text: "中国語で、いちばん困るのは？",
    choices: [
      {
        label: "声調やピンインが、聞き分けられない",
        app: "kotonooto",
        // ことのおと's: 文の中で（その語が、ことのあめの例文の中で流れる）。
        also: { app: "kotonoame", why: "聞き分けた語は、ことのあめ の中国語の文の中でも流れます。" },
      },
      {
        label: "言いたい文が、すぐに出てこない",
        app: "kotonoame",
        // ことのおと's: 言の雨に育まれた言の葉が、声になって通じるための耳と口をつくる。
        also: { app: "kotonooto", why: "声調とピンインを耳で聞き分けるのは、ことのおと が受け持ちます。" },
      },
    ],
  },
};
