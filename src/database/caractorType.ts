const DicedStatusName = ["STR", "CON", "POW", "DEX", "APP", "SIZ", "INT", "EDU"] as const;

export type DicedStatusName = typeof DicedStatusName[number];

const undicedStatusName = ["HP", "MP", "SAN", "アイデア", "幸運", "知識"] as const;
export type UnDicedStatusName = typeof undicedStatusName[number];

const skillCategory = [
  "戦闘",
  "武道",
  "技術",
  "製作",
  "操縦",
  "サバイバル",
  "感覚",
  "交渉",
  "知識",
  "芸術",
  "言語",
  "その他",
] as const;
export type SkillCategory = typeof skillCategory[number];

export const defaultSkillName = {
  戦闘: [
    "こぶし",
    "キック",
    "頭突き",
    "組みつき",
    "投擲",
    "拳銃",
    "ライフル",
    "弓",
    "杖",
    "ナイフ",
    "回避",
  ],
  武道: [],
  技術: [
    "応急手当",
    "鍵開け",
    "隠す",
    "隠れる",
    "写真術",
    "変装",
    "機械修理",
    "電気修理",
    "運転",
    "重機械操作",
    "コンピュータ",
  ],
  製作: [],
  操縦: [],
  サバイバル: ["追跡", "登攀", "忍び歩き", "乗馬", "水泳", "跳躍", "経理"],
  感覚: ["目星", "聞き耳", "ナビゲート"],
  交渉: ["言いくるめ", "信用", "説得", "値切り"],
  知識: [
    "オカルト",
    "精神分析",
    "図書館",
    "医学",
    "化学",
    "考古学",
    "人類学",
    "生物学",
    "地質学",
    "電子工学",
    "天文学",
    "博物学",
    "物理学",
    "薬学",
    "心理学",
    "法律",
    "歴史",
    "クトゥルフ神話",
  ],
  芸術: [],
  言語: ["母国語"],
  その他: [],
} as const;
export type DefaultSkillName = typeof defaultSkillName[SkillCategory][number];

export type Caractor = {
  id: string;
  name: string;
  description: string;
  job: string;
  icon: string;
  status: {
    name: DicedStatusName | UnDicedStatusName;
    value: number;
  }[];
  skill: {
    name: DefaultSkillName | string;
    value: number;
  }[];
  items: {
    name: string;
    num: number;
  };
};
