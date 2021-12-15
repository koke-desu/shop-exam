import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MdSearch as SearchIcon } from "react-icons/md";
import { MdMode as CreateIcon } from "react-icons/md";
import { MdList as ManageIcon } from "react-icons/md";
import { MdAccountCircle as UserIcon } from "react-icons/md";
import { MdShoppingCart as CartIcon } from "react-icons/md";
import { cartContext } from "../App";

type Props = {};

// Top、探す、つくる、管理する、へのリンクの設置。余裕があればmodalを使ったHelpを作れば完成度が上がりそう。
const Header: React.VFC<Props> = ({}) => {
  const cart = useContext(cartContext);

  return (
    <div className="w-full h-20 bg-header flex justify-center items-center">
      <div className="container h-full flex flex-row justify-end items-center flex-nowrap">
        <div className="w-36 h-16 mr-auto bg-white flex justify-center items-center">
          かっこいいロゴ
        </div>
        <nav className="w-96 mr-8">
          <ul className="flex flex-row border-r-2 border-black">
            <NavButton
              title="さがす"
              icon={<SearchIcon fill="#fff" opacity={0.5} size={48} />}
              link="/list"
            />
            <NavButton
              title="つくる"
              icon={<CreateIcon fill="#fff" opacity={0.5} size={48} />}
              link="/create"
            />
            <NavButton
              title="管理する"
              icon={<ManageIcon fill="#fff" opacity={0.5} size={48} />}
              link="/manage"
            />
          </ul>
        </nav>
        <Link className="mx-4 relative" to="/cart">
          <p className="absolute -top-2 -right-2 m-0 h-6 w-6 text-white font-bold text-center rounded-full bg-red-500">
            {cart.items.length}
          </p>
          <CartIcon size={48} fill="white" />
        </Link>
        <div className="mx-4">
          <UserIcon size={48} fill="white" />
        </div>
      </div>
    </div>
  );
};
export default Header;

const NavButton: React.VFC<{ title: string; icon: React.ReactNode; link: string }> = ({
  title,
  icon,
  link,
}) => {
  return (
    <li className="w-1/3 h-20 duration-500 hover:bg-white hover:bg-opacity-20">
      <Link to={link}>
        <div className="h-full flex flex-col justify-start items-center border-l-2 border-gray-900">
          {icon}
          <p className="text-white opacity-50 text-base -mt-2">{title}</p>
        </div>
      </Link>
    </li>
  );
};
