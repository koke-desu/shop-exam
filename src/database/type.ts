// 商品の情報
export type Item = {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  stock: number;
  reviews: Review[];
  timeStamp: Date;
  averageStars: number;
  status: "Selled" | "Unsell";
};

// 商品のカテゴリー
export type Category = {
  id: string;
  name: string;
  numOfItems: number;
};

// 商品をリスト表示するための最低限の情報
export type ItemThumbnail = Pick<Item, "id" | "name" | "averageStars" | "status" | "icon">;

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
