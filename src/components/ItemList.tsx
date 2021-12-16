import React, { useState, useEffect } from "react";
import { dicedStatusName, DicedStatusName } from "../database/characterType";
import { ItemInterface } from "../database/itemInterface";
import { Item as ItemType } from "../database/type";
import ItemCard from "./ItemCard";
import { MdClose as CloseIcon } from "react-icons/md";

type Props = {};

const ItemList: React.VFC<Props> = ({}) => {
  const [items, setItems] = useState<ItemType[]>([]);

  // 並び替えを制御
  const [isOpen, setIsOpen] = useState(false);
  const [sortField, setSortField] = useState<DicedStatusName | null>(null);
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const [showDialog, setShowDialog] = useState(true);

  useEffect(() => {
    ItemInterface.getAll().then(setItems);
  }, []);

  const onSort = () => {
    sortField && ItemInterface.getSort(sortField, order).then(setItems);
    setIsOpen(false);
  };

  return (
    <div className="w-full flex flex-col justify-start items-center p-4 pt-8 ">
      <div
        className={`fixed z-20 flex justify-center items-center top-20 w-4/5 rounded-lg mx-auto p-4 shadow-lg bg-red-300 ring-1 ring-offset-2 ring-red-500 backdrop-blur-lg duration-300 ${
          showDialog ? "opacity-100" : "hidden"
        } `}
      >
        <p className="text-center flex-1 text-lg">
          このWebアプリは授業で作った、テストアプリです。表示されている商品、価格などはすべてフィクションです。
        </p>
        <CloseIcon
          fill="#fff"
          size={32}
          className="cursor-pointer"
          onClick={() => {
            setShowDialog(false);
          }}
        />
      </div>

      <div
        className={`fixed z-10 inset-0 bg-black bg-opacity-20 w-screen h-screen ${
          !isOpen ? "hidden" : ""
        }`}
        onClick={() => {
          setIsOpen(false);
        }}
      >
        <div
          className="flex flex-col relative w-2/3 h-2/3 bg-white shadow-2xl rounded-xl transform translate-y-1/4 mx-auto"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="absolute right-8 bottom-8 flex flex-row gap-4">
            <button
              className="p-2"
              onClick={() => {
                setIsOpen(false);
                setSortField(null);
              }}
            >
              キャンセル
            </button>
            <button className="px-8 py-2 bg-gray-300 text-lg rounded-xl shadow-lg" onClick={onSort}>
              決定
            </button>
          </div>

          <h2>並替え</h2>
          <div className="flex flex-row w-full ">
            <ul className="w-1/2 items-center flex flex-col gap-2">
              <p className="px-4 mb-4 text-2xl border-b-2 border-gray-500">ステータス名</p>
              {dicedStatusName.map((val) => {
                const selected = sortField === val;

                return (
                  <li
                    key={`search-sort-modal-${val}`}
                    className={`w-max py-1 px-8 text-lg rounded-lg border cursor-pointer ${
                      selected
                        ? "text-blue-500 border-blue-500 ring-2 ring-offset-2 ring-blue-500"
                        : "border-gray-300"
                    }`}
                    onClick={() => {
                      if (selected) setSortField(null);
                      else setSortField(val);
                    }}
                  >
                    <p>{val}</p>
                  </li>
                );
              })}
            </ul>
            <ul className="w-1/2 items-center flex flex-col gap-2">
              <p className="px-4 mb-4 text-2xl border-b-2 border-gray-500">並替えの向き</p>
              {[
                { val: "asc", view: "昇順" },
                { val: "desc", view: "降順" },
              ].map(({ val, view }) => {
                const selected = order === val;

                return (
                  <li
                    key={`search-sort-modal-${val}`}
                    className={`w-max py-1 px-8 text-lg rounded-lg border cursor-pointer ${
                      selected
                        ? "text-blue-500 border-blue-500 ring-2 ring-offset-2 ring-blue-500"
                        : "border-gray-300"
                    }`}
                    onClick={() => {
                      setOrder(val as "asc" | "desc");
                    }}
                  >
                    <p>{view}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full h-16">
        <button
          className="px-8 py-2 bg-gray-300 text-2xl rounded-xl absolute left-1/4 shadow-lg"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          並替え
        </button>
      </div>
      <div className="mt-8 container grid grid-cols-3 gap-8">
        {items.map((item) => (
          <ItemCard item={item} key={`item-list-${item.id}`} />
        ))}
      </div>
    </div>
  );
};
export default ItemList;
