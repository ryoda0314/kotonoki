// 言の雨: the words that fall from ことのあめ's cloud onto the tree in the first picture. Each is the apps' own: a line
// or a word from its intro page or its CONCEPT.md, never one made up here. ことのね's kanji are in the Japanese forms it
// shows by default (its 漢字の字形 setting: 日本の字), not the Korean 學. They fall one a second, left, right and
// middle in turn (and the last and the first of a round apart too), so a few are in the air at once and none covers
// another.

export type Drop = {
  text: string;
  /** Where it comes from. */
  app: string;
  /** Its centre across the picture (of 400). */
  x: number;
  /** Where it rests when nothing moves (reduced motion), between the cloud (72) and the crown (156). */
  y: number;
  /** One of the few left resting there when nothing moves; the rest only fall. */
  rest?: true;
};

export const DROPS: Drop[] = [
  { text: "내일 카페 갈래?", app: "kotonoame", x: 148, y: 80, rest: true },
  { text: "take it easy", app: "kotonoha", x: 256, y: 92, rest: true },
  { text: "大学 dàxué", app: "kotonooto", x: 196, y: 150, rest: true },
  { text: "라디오", app: "kotonome", x: 136, y: 120 },
  { text: "진지 드셨어요?", app: "kotonoeda", x: 262, y: 136, rest: true },
  { text: "학생 学生", app: "kotonone", x: 186, y: 106, rest: true },
  { text: "feel like going out", app: "kotonoha", x: 152, y: 150 },
  { text: "바나나", app: "kotonome", x: 262, y: 116 },
  { text: "大雪 dàxuě", app: "kotonooto", x: 190, y: 82 },
  { text: "같이 밥 먹을래?", app: "kotonoame", x: 140, y: 102 },
  { text: "대학 大学", app: "kotonone", x: 252, y: 70 },
  { text: "no rush", app: "kotonokage", x: 194, y: 128 },
  { text: "allocate", app: "kotonomi", x: 132, y: 136, rest: true },
  { text: "what are you up to", app: "kotonokage", x: 246, y: 112 },
];

/** One round of the rain, in seconds: each word falls once in it, a second after the one before. */
export const RAIN_CYCLE = DROPS.length;
