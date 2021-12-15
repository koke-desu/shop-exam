import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cartContext } from "../App";
import { ItemInterface } from "../database/itemInterface";
import { IoTrash as TrashIcon } from "react-icons/io5";
type Props = {};

const Cart: React.VFC<Props> = ({}) => {
  const cart = useContext(cartContext);
  const navigate = useNavigate();

  // 購入終了後、その旨を表示するモーダルを制御。
  const [show, setShow] = useState(false);

  // カートから削除する
  const onDelete = (index: number) => {
    cart.setCart({ ...cart, items: cart.items.filter((_, i) => i != index) });
  };

  // 購入処理。
  const onSubmit = async () => {
    for (let item of cart.items) {
      await ItemInterface.buy(item.id);
    }

    setShow(true);
    setTimeout(() => {
      cart.setCart({ ...cart, items: [] });
      navigate("/list");
    }, 1500);
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col mx-auto w-2/3 justify-start items-center gap-4">
        {cart.items.map((item, index) => (
          <div className="flex-1 w-full flex flex-row justify-start items-center border border-gray-300 gap-4 shadow-md rounded-lg p-4">
            {item.icon ? (
              <img
                src={item.icon}
                style={{ aspectRatio: "16/9" }}
                className="w-20 object-contain  "
              />
            ) : (
              <div
                className="w-20 flex items-center justify-center bg-white  "
                style={{ aspectRatio: "16/9" }}
              >
                <p className="text-center text-xl text-gray-500 font-bold">No Image</p>
              </div>
            )}
            <p className="text-lg">{item.name}</p>
            <p className="text-red-500 ml-auto">
              <span className="text-2xl">0</span> 円
            </p>
            <TrashIcon
              size={32}
              onClick={() => {
                onDelete(index);
              }}
              className="cursor-pointer"
            />
          </div>
        ))}

        <div className="mt-8">
          <button
            className="px-8 py-2 bg-gray-300 text-2xl rounded-xl mx-auto shadow-lg"
            onClick={onSubmit}
          >
            購入
          </button>
        </div>
      </div>
      <div
        className={`fixed fle justify-center items-center top-16 w-4/5 rounded-lg mx-auto p-4 shadow-lg bg-blue-300 ring-1 ring-offset-2 backdrop-blur-lg duration-300 ${
          show ? "opacity-100" : "opacity-0"
        } `}
      >
        <p className="text-center">購入が完了しました。トップページに戻ります</p>
      </div>
    </div>
  );
};
export default Cart;
