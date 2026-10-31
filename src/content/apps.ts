// The apps, in their own words, never made up here:
// - `lead`: the first line of each app's intro page (ことのね's: its CONCEPT.md).
// - `about`: its meta description.
// - `body`: the paragraphs of its intro page (ことのね's: its intro copy and the facts in its CONCEPT.md).
// - `start`: how it is started, as its intro page says.
// - `part` and `role`: its row in the sisters' table of the classical image (ことのめ's CONCEPT.md); ことのえだ, ことのみ
//   and ことのかげ came after that table, so theirs are from their own CONCEPT.md.
// - `url`: its live address, looked at there before it is added. ことのみ has none yet, so it is shown as 準備中.
// - `media`: the app itself, seen: the promo film its own repo made (../kotono/<repo>/promo), made small for the web by
//   scripts/films/make.mjs. Never redrawn or recorded here; until its repo has made one, an app goes without.
// When an app changes its words, change them here too.

export type Lang = "ko" | "en" | "zh";

/** The app itself, seen: the film made for it in its own repo. */
export type Media = { src: string; poster: string; label: string };

export type App = {
  id: string;
  name: string;
  /** The name in kanji: 言の雨. */
  kanji: string;
  /** Its part of the tree. */
  part: string;
  /** What that part stands for (the sisters' table). */
  role: string;
  langs: Lang[];
  lead: string;
  about: string;
  body: string[];
  start: string;
  /** Its live address; none while it is still being made (準備中). */
  url?: string;
  /** How a learner's record is kept. */
  account: "required" | "optional" | "none";
  media?: Media;
};

export const LANGS: Record<Lang, string> = { en: "英語", zh: "中国語", ko: "韓国語" };

// The intro pages of ことのめ, ことのは, ことのえだ and ことのおと all say this, and that a ことのあめ account carries the
// record to any device. ことのかげ and ことのみ say the same in their own words.
const NO_SIGN_UP = "登録はいりません。記録はこの端末に残ります。ことのあめのアカウントでログインすると、どの端末でも続きから使えます。";

/**
 * In the order the tree grows: rain, sprout, leaves, the branch and the fruit it bears, the voice the leaves become and
 * the shadow that follows it; the roots under the ground.
 */
export const APPS: App[] = [
  {
    id: "kotonoame",
    name: "ことのあめ",
    kanji: "言の雨",
    part: "雨",
    role: "浴びる例文",
    langs: ["ko", "en", "zh"],
    lead: "言の葉は、言の雨に育まれる。",
    about:
      "例文の雨を浴びて、使える言葉へ。同じかたちの短い文が音声付きで降ってきて、共通しているところに自分で気づく。韓国語・英語・中国語を、日本語から。",
    body: [
      "同じかたちの短い文が、音声付きで雨のように降ってくる。覚えるための完成品ではなく、あなたの言葉を育てる雨です。浴びて、気づいて、言ってみて、忘れたころにまた出会う。そのうちに、使える言葉が自分の中に育っていきます。",
      "文法の一覧から始めるのではなく、似た文をいくつも浴びて、共通しているところに自分で気づく。使ってみて、直してもらって、忘れてもまた出会う。テストで分かることと、実際に使えることは別だからです。",
    ],
    start: "無料ではじめられます。ことのあめのアカウントをつくって使います。",
    url: "https://polylinga.vercel.app",
    account: "required",
    media: { src: "/films/kotonoame.mp4", poster: "/films/kotonoame.jpg", label: "ことのあめ の紹介映像（1分51秒・字幕とナレーション）" },
  },
  {
    id: "kotonome",
    name: "ことのめ",
    kanji: "言の芽",
    part: "芽",
    role: "はじめに出る芽、読めるようになった字",
    langs: ["ko"],
    lead: "90秒だけ知って、あとは浴びる。",
    about:
      "最初の90秒で、子音は口の形、母音は音で。あとは音つきの語を浴び、知らない字は出会ったときにその場で調べ、ふつうの韓国語キーボードで自分の指で打つ。",
    body: [
      "最初は90秒だけ。子音は口の形の絵（ㄱ は舌の奥、ㅁ は閉じた口）、母音は音で。字の表を覚えるところからは始めません。",
      "あとは、音つきの語を浴びる。知らない字は、出会ったときに押せばその場で分かる。全部の字を覚えてから進まなくていい。",
      "聞いた語は、ふつうの韓国語キーボードで、自分の指で打ってみる。スマホやパソコンで韓国語を打つのと同じ配列です。",
    ],
    start: NO_SIGN_UP,
    url: "https://kotonome-kappa.vercel.app",
    account: "optional",
    media: { src: "/films/kotonome.mp4", poster: "/films/kotonome.jpg", label: "ことのめ の紹介映像（1分30秒・字幕とナレーション）" },
  },
  {
    id: "kotonoha",
    name: "ことのは",
    kanji: "言の葉",
    part: "葉",
    role: "自分のものになった言葉",
    langs: ["en"],
    lead: "借りた言葉が、自分の言葉になるまで。",
    about:
      "読めば分かる英語を、使える英語に。外の英語に出会い、日本語を混ぜて言ってみて、意図を保ったまま直してもらう。借りた表現は、別の会話の中でまた出会う。",
    body: [
      "読めば分かる英語は多いのに、話そうとすると出てこない。覚えた数を増やすより、使える場面を広げたい。",
      "短い会話に出会って、気になった表現を借りる。自分のことを、英語が出てこないところは日本語のまま言ってみる。意図を保ったまま英語に直してもらい、相手はその中身に返してくれる。",
      "直した文からは「今回英語で言えなかったところ」と「また使えるフレーズ」が残り、借りた表現は日をあけて、別の会話の中でまた出会う。",
    ],
    start: NO_SIGN_UP,
    url: "https://kotonoha-ashy.vercel.app",
    account: "optional",
    media: { src: "/films/kotonoha.mp4", poster: "/films/kotonoha.jpg", label: "ことのは の紹介映像（1分40秒・字幕とナレーション）" },
  },
  {
    id: "kotonoeda",
    name: "ことのえだ",
    kanji: "言の枝",
    part: "枝",
    role: "ふだんの語から上の語へ",
    langs: ["ko"],
    lead: "友だちに言えることを、目上の人にも。",
    about:
      "반말から入った人が、말씀・잡수시다 のような上の語を、文と人と声で身につける。同じひとことが相手を替えて段を上り、人と場面が渡されたら、自分ならどう返すかを言ってみる。",
    body: [
      "友だちとの반말なら話せる。でも、先生や友だちのおばあさんの前だと、言葉が出てこない。足りないのは語尾ではなく、말씀・잡수시다 のような語。",
      "同じひとことが、相手を替えて段を上っていく。上の語には、いつも ふだんの語が添えてあるので、どの語の上なのかがすぐ分かる。",
      "人と場面が渡されたら、自分ならどう返すかを言ってみる。반말や日本語を混ぜても、その人に合う言い方に直り、相手は中身に返してくれる。",
    ],
    start: NO_SIGN_UP,
    url: "https://keigo-green.vercel.app",
    account: "optional",
    media: { src: "/films/kotonoeda.mp4", poster: "/films/kotonoeda.jpg", label: "ことのえだ の紹介映像（1分56秒・字幕とナレーション）" },
  },
  {
    id: "kotonomi",
    name: "ことのみ",
    kanji: "言の実",
    part: "実",
    role: "指で摘んで、身につけた語",
    langs: ["en"],
    lead: "英単語を、指で覚える。",
    about:
      "TOEIC・TOEFL の英単語を、意味と音と例文といっしょに、自分の指で打って覚える。見ながら打ち、例文の中で打ち、少しあとに日本語から思い出して打つ。",
    body: [
      "TOEIC・TOEFL によく出る語を、意味と音と例文といっしょに。まず見ながら打ち、例文の中でもう一度打ち、少しあとに日本語から思い出して打ちます。",
      "思い出せなかった語は、日をあけてまた出てきます。思い出せた語は、間をのばして。点数も速さも測りません。",
      "キーボードの案内つき。次に押すキーと、押す指が光ります。語を打つうちに、指がキーの場所を覚えます。",
    ],
    start: "登録はいりません。記録はこの端末に残ります。ことのあめのアカウントでつなぐと、どの端末でも続きます。",
    account: "optional",
  },
  {
    id: "kotonooto",
    name: "ことのおと",
    kanji: "言の音",
    part: "音",
    role: "聞き分けられるようになった音",
    langs: ["zh"],
    lead: "知っている違いと、聞こえる違いは別のもの。",
    about:
      "中国語の声調とピンインを、耳で聞き分けて、口で言えるように。1か所だけ違う語の組が、いくつもの声で降ってくる。聞き比べて、聞き分けて、言ってみる。",
    body: [
      "大学 dàxué と 大雪 dàxuě。肚子 dùzi と 兔子 tùzi。人民 rénmín と 人名 rénmíng。日本語では区別しない違いなので、知っていても最初は同じに聞こえる。",
      "1か所だけ違う語の組が、4つの声で降ってくる。聞き比べて、どっちだったか選ぶと、すぐ答えが分かる。何度も直されるうちに、ある日ふいに別の音として聞こえてくる。",
      "表や理屈からは入らない。違いの名前は、聞き分けたあとで知ればいい。",
    ],
    start: NO_SIGN_UP,
    url: "https://kotonoame-ch.vercel.app",
    account: "optional",
    media: { src: "/films/kotonooto.mp4", poster: "/films/kotonooto.jpg", label: "ことのおと の紹介映像（1分47秒・字幕とナレーション）" },
  },
  {
    id: "kotonokage",
    name: "ことのかげ",
    kanji: "言の影",
    part: "影",
    role: "手本の声に、少し遅れて重なる自分の声",
    langs: ["en"],
    lead: "読めば分かる英語を、電話で使える英語に。",
    about: "聞こえた英語の声に、すぐあとから自分の声を重ねる。読めば分かる英語を、聞いて分かり、その場で返せる英語に。",
    body: [
      "読めば分かるのに、ふつうの速さの会話は聞き取れない。言いたいことがあっても、その場で口から出てこない。英語が「見れば分かる言葉」のままになっている。",
      "ことのかげ では、二人の短い会話を字幕なしで聞き、聞こえなかったところに気づいてから、声のすぐあとを自分の声で追いかけます（シャドーイング）。録った声は手本と並び、機械の耳に何と聞こえたかが返ってきます。点数はありません。",
      "追いかけたら、相手の声に返す。はじめは役のせりふで、次は自分の事情で。直した文は手本の声になって、それも追いかけられます。追いかけたまとまりは、日をあけて別の会話でまた聞こえてきます。",
    ],
    start:
      "登録はいりません。記録はこの端末に残ります。ことのあめのアカウントがあれば、つなぐと記録がどの端末でも続きます。イヤホンがあると録りやすくなります。",
    url: "https://kotonokage.vercel.app",
    account: "optional",
  },
  {
    id: "kotonone",
    name: "ことのね",
    kanji: "言の根",
    part: "根",
    role: "言葉をつなぐ漢字",
    langs: ["ko"],
    lead: "覚えた韓国語を、漢字の根でつなぐ。",
    about: "韓国語の漢字語を打って集めると、漢字に分かれて前の語とつながり、集めた字だけで読める語が見つかる。",
    body: [
      "授業やドラマで覚えた韓国語の漢字語を、自分の指で打ってください。漢字の根に分かれて、前に集めた語とつながります。",
      "韓国語の辞書の語の半分以上は漢字語で、その漢字は日本語とほぼ同じ。學生 と見れば、日本語を話す人は意味が分かる。足りないのは韓国語の「音」だけ。",
      "학생（學生）と 대학（大學）を覚えた人は、まだ習っていない 대학생（大學生）がもう読める。1語覚えるたびに、読める語がまとめて増える。",
    ],
    start: "アカウントはいりません。端末の中で完結し、オフラインでも動きます。",
    url: "https://hanja-xi.vercel.app",
    account: "none",
    media: { src: "/films/kotonone.mp4", poster: "/films/kotonone.jpg", label: "ことのね の紹介映像（1分51秒・字幕とナレーション）" },
  },
];

export const appById = (id: string) => APPS.find((a) => a.id === id)!;

/** The author's note: how Korean went from a language studied to a language used, in a year. */
export const NOTE_URL = "https://note.com/ryoda_/n/n4e69c14a99cb";
