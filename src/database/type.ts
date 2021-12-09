import { Character, DefaultSkillName, DicedStatusName, UnDicedStatusName } from "./characterType";

// 商品の情報
export type Item = Character & {
  categoryId: string;
  downloaded: number; // ダウンロードされた回数
  reviews: Review[];
  goods: number; // いいねの数
  timeStamp: Date;
};

// 商品のカテゴリー
export type Category = {
  id: string;
  name: string;
  numOfItems: number;
};

// 商品をリスト表示するための最低限の情報
export type ItemThumbnail = Pick<
  Item,
  "id" | "name" | "status" | "icon" | "goods" | "downloaded" | "categoryId"
>;

// レビュー
export type Review = {
  id: string;
  title: string;
  body: string;
  timeStamp: Date;
  stars: number;
};

// カート
export type Cart = {
  item: ItemThumbnail;
  orders: number;
}[];
