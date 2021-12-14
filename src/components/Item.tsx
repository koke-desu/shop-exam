import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { cartContext } from "../App";
import { dicedStatusName, statusColor, undicedStatusName } from "../database/characterType";
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

  // カートへの追加処理。
  const [showDialog, setShowDialog] = useState(false);
  const { items, setCart } = useContext(cartContext);
  const onAddCart = () => {
    if (item === undefined) return;
    setShowDialog(true);
    setTimeout(() => {
      setShowDialog(false);
    }, 1500);
    setCart({ items: [...items, item] });
  };

  return !item ? (
    <div>商品が見つかりませんでした。</div>
  ) : (
    <div className="container grid grid-cols-5 gap-12 mx-auto ">
      <div
        className={`fixed fle justify-center items-center top-16 w-4/5 rounded-lg mx-auto p-4 shadow-lg bg-blue-300 ring-1 ring-offset-2 backdrop-blur-lg duration-300 ${
          showDialog ? "opacity-100" : "opacity-0"
        } `}
      >
        <p className="text-center">アイテムがカートに追加されました</p>
      </div>

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
    <img
      src={icon}
      style={{ aspectRatio: "16/9" }}
      className="w-full object-contain border border-gray-300 shadow-lg"
    />
  ) : (
    <div
      className="w-full flex items-center justify-center bg-white border border-gray-300 shadow-lg"
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
          <p className={`p-2 ${statusColor(status[name], name)}`}>
            {status[name] ? status[name] : 0}
          </p>
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
