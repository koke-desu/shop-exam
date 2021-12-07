import React from "react";
import { Link } from "react-router-dom";
import { MdSearch as SearchIcon } from "react-icons/md";
import { MdMode as CreateIcon } from "react-icons/md";
import { MdList as ManageIcon } from "react-icons/md";

type Props = {};

// Top、探す、つくる、管理する、へのリンクの設置。余裕があればmodalを使ったHelpを作れば完成度が上がりそう。
const Header: React.VFC<Props> = ({}) => {
  return (
    <div className="w-full h-24 bg-indigo-700 flex justify-center items-center">
      <div className="container flex flex-row justify-start items-center flex-nowrap">
        <div className="w-36 h-16 bg-white">かっこいいロゴ</div>
        <nav className="h-full w-96">
          <ul className="flex flex-row">
            <NavButton title="さがす" icon={<SearchIcon fill="#fff" width={48} />} link="/list" />
            <NavButton title="つくる" icon={<CreateIcon fill="#fff" width={48} />} link="/create" />
            <NavButton
              title="管理する"
              icon={<ManageIcon fill="#fff" width={48} />}
              link="/manage"
            />
          </ul>
        </nav>
        <div></div>
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
    <li className="w-1/3">
      <Link to={link}>
        <div className="h-full flex flex-col justify-start items-center">
          {/* <img src={`images/${fileName}.svg`} color="#fff" width={48} /> */}
          {icon}
          <p className="text-white">{title}</p>
        </div>
      </Link>
    </li>
  );
};
