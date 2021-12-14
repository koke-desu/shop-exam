export const dicedStatusName = ["STR", "CON", "POW", "DEX", "APP", "SIZ", "INT", "EDU"] as const;

export type DicedStatusName = typeof dicedStatusName[number];

export const undicedStatusName = ["HP", "MP", "SAN", "アイデア", "幸運", "知識"] as const;
export type UnDicedStatusName = typeof undicedStatusName[number];

export const skillCategory = [
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

export type Character = {
  id: string;
  name: string;
  description: string;
  job: string;
  icon: string;
  status: {
    [name in DicedStatusName | UnDicedStatusName]: number;
  };
  skill: {
    [category in SkillCategory]?: {
      [name in DefaultSkillName | string]: number;
    };
  };
  items: {
    [name: string]: number;
  };
};

// nameの値によって、ダイスロールの種類を返す。
export const statusDiceRoll = (name: DicedStatusName) => {
  if (name === "STR" || name === "CON" || name === "DEX" || name === "POW" || name === "APP")
    return "3D6";
  else if (name === "INT" || name === "SIZ") return "2D6+6";
  else if (name === "EDU") return "3D6+3";
};

// Statusの値によって対応した色を返す。高ければ青色、低ければ赤色みたいな感じに。
export const statusColor = (val: number, name: DicedStatusName) => {
  // 3D6, 2D6+6, 3D6+3, のぞれそれの場合における処理の関数
  const case1 = (val: number) => {
    if (val === 18) return "text-yellow-400";
    if (val >= 12) return "text-blue-400";
    if (val === 3) return "text-red-700";
    if (val < 6) return "text-red-400";
    return "";
  };
  const case2 = (val: number) => {
    if (val === 18) return "text-yellow-400";
    if (val >= 14) return "text-blue-400";
    if (val === 8) return "text-red-700";
    if (val < 10) return "text-red-400";
    return "";
  };
  const case3 = (val: number) => {
    if (val === 21) return "text-yellow-400";
    if (val >= 15) return "text-blue-400";
    if (val === 6) return "text-red-700";
    if (val < 9) return "text-red-400";
    return "";
  };

  //
  const diceRoll = statusDiceRoll(name);
  if (diceRoll === "3D6") return case1(val);
  if (diceRoll === "2D6+6") return case2(val);
  if (diceRoll === "3D6+3") return case3(val);

  return "";
};

// アイデア、SAN値などの他の値を元に、算出する値を返す。
export const calcStatus = (
  status: { [name in DicedStatusName]: number },
  name: UnDicedStatusName
) => {
  switch (name) {
    case "SAN":
    case "幸運":
      return status.POW * 5;
    case "アイデア":
      return status.INT * 5;
    case "知識":
      return status.EDU * 5 >= 100 ? 99 : status.EDU * 5;
    case "HP":
      return Math.floor((status.CON + status.SIZ) / 2);
    case "MP":
      return status.POW;
  }
};
