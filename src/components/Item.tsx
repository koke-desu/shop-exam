import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dicedStatusName, undicedStatusName } from "../database/characterType";
import { ItemInterface } from "../database/itemInterface";
import { Item as ItemType } from "../database/type";
type Props = {};

// itemのシングルビュー
const Item: React.VFC<Props> = ({}) => {
  const itemId = useParams().itemId;

  const [item, setItem] = useState<ItemType>();

  useEffect(() => {
    itemId && ItemInterface.get(itemId).then(setItem);
  }, []);

  const onAddCart = () => {};

  return !item ? (
    <div>商品が見つかりませんでした。</div>
  ) : (
    <div className="container grid grid-cols-5 gap-12 ">
      <h1 className="col-span-full text-4xl">{item.name}</h1>

      <div className="col-span-3 flex flex-col gap-8">
        <Icon icon={item.icon} />
        <Status id={item.id} status={item.status} />
      </div>

      <div className="col-span-2 flex flex-col gap-8 ">
        <button
          className="px-8 py-2 bg-gray-300 text-2xl rounded-xl mx-auto shadow-lg"
          onClick={onAddCart}
        >
          カートに入れる
        </button>

        {/* info */}
        <Info downloaded={item.downloaded} timeStamp={item.timeStamp} />

        {/* description */}
        <p className="text-lg">{item.description}</p>
      </div>
    </div>
  );
};
export default Item;

// アイコンを表示。アイコンが存在しない場合は、”No Image”と表示する。
const Icon = ({ icon }: { icon: string }) => {
  return icon ? (
    <img src={icon} style={{ aspectRatio: "16/9" }} />
  ) : (
    <div
      className="w-full flex items-center justify-center bg-white border border-gray-300"
      style={{ aspectRatio: "16/9" }}
    >
      <p className="text-center text-4xl text-gray-500 font-bold">No Image</p>
    </div>
  );
};

// Diced、UnDiced Statusを表で。各ステータスの値が存在しない場合は0を表示。
const Status = ({ id, status }: { id: string; status: ItemType["status"] }) => (
  <div className="grid grid-cols-2 divide-x divide-gray-300 border border-gray-300 rounded-lg shadow-lg">
    <div>
      {dicedStatusName.map((name, index) => (
        <div
          className={`w-full flex flex-row items-center ${
            index % 2 == 1 ? "bg-white" : "bg-gray-200"
          }`}
          key={`item-${id}-skill-${name}`}
        >
          <p className="w-20 p-2">{name}</p>
          <p className="p-2">{status[name] ? status[name] : 0}</p>
        </div>
      ))}
    </div>
    <div>
      {undicedStatusName.map((name, index) => (
        <div
          className={`w-full flex flex-row items-center ${
            index % 2 == 1 ? "bg-white" : "bg-gray-200"
          }`}
          key={`item-${id}-skill-${name}`}
        >
          <p className="w-20 p-2">{name}</p>
          <p className="p-2">{status[name] ? status[name] : 0}</p>
        </div>
      ))}
    </div>
  </div>
);

//
const Info = ({ timeStamp, downloaded }: Pick<ItemType, "timeStamp" | "downloaded">) => (
  <div className="flex flex-col divide-y divide-gray-500">
    <p className="py-4 pl-4">0 円</p>
    <p className="py-4 pl-4">{timeStamp.format("YYYY/MM/DD")}アップロード</p>
    <p className="py-4 pl-4">{downloaded} ダウンロード</p>
  </div>
);
