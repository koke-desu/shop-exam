import React, { useState, useEffect } from "react";
import { ItemInterface } from "../database/itemInterface";
import { Item as ItemType } from "../database/type";

type Props = {};

const ItemList: React.VFC<Props> = ({}) => {
  const [items, setItems] = useState<ItemType[]>([]);

  useEffect(() => {
    ItemInterface.getAll().then(setItems);
  }, []);

  return (
    <div className="w-full flex justify-center p-4 ">
      <div className="container grid grid-cols-3 gap-y-16">
        {items.map((item) => (
          <div className="bg-gray-400 h-72 w-64 justify-self-center" key={`item-list-${item.id}`}>
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};
export default ItemList;
