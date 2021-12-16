import React from "react";
import { Item as ItemType } from "../database/type";
import { Link } from "react-router-dom";

type Props = {
  item: ItemType;
};

const ItemCard: React.VFC<Props> = ({ item }) => {
  return (
    <Link
      to={`/item/${item.id}`}
      className="col-span-1 w-full flex flex-col justify-self-center shadow-lg border border-gray-200"
    >
      {item.icon ? (
        <img
          src={item.icon}
          className="w-full object-contain"
          style={{ aspectRatio: "16/9" }}
          alt={item.name}
        />
      ) : (
        <div
          className="w-full flex items-center justify-center bg-white"
          style={{ aspectRatio: "16/9" }}
        >
          <p className="text-center text-4xl text-gray-500 font-bold">No Image</p>
        </div>
      )}
      <div className="bg-indigo-100 flex-1 w-full p-4 flex flex-col relative gap-2">
        <p className="text-sm ml-auto">{item.timeStamp.format("MM/DD")}</p>
        <p className="text-xl overflow-ellipsis overflow-hidden">{item.name}</p>
        <p>
          <span className="text-xl">{item.downloaded}</span>
          <span className="text-sm ml-1">Download</span>
        </p>
      </div>
    </Link>
  );
};
export default ItemCard;
