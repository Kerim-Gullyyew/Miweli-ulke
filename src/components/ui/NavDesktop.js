import React from "react";
import { AiOutlineTransaction } from "react-icons/ai";
import { BiCollection, BiTransfer } from "react-icons/bi";
import { TbBrandProducthunt } from "react-icons/tb";
import { VscAccount } from "react-icons/vsc";
import { AiTwotoneContainer } from "react-icons/ai";
import { GrSend, GrTransaction } from "react-icons/gr";
import { MdManageAccounts, MdProductionQuantityLimits } from "react-icons/md";
import { uiContext } from "./uiContext";
import { uiStyle } from "./uiStyle";
import { Link } from "react-router-dom";
import isStock from "../../utils/isStock";
import { useDispatch, useSelector } from "react-redux";
import isEmployee from "../../utils/isEmployee";
import { RiFileReduceLine } from "react-icons/ri";
import { SlLogout } from "react-icons/sl";
import { logoutUser } from "../../features/auth/login/loginSlice";
const NavDesktop = () => {
  const groups = useSelector((state) => state.login.groups);
  const dispatch = useDispatch();
  const logOutClicked = async (e) => {
    e.preventDefault();
    await dispatch(logoutUser());
    return {};
  };
  let content = (
    <section className="w-full px-10 space-x-16 text-colorTextDarkBlue font-bold hidden desktop:flex p-1 bg-white shadow-sm">
     {isStock(groups) ? (
      <Link to="/batch">
        <div className={uiStyle.icon}>
          <BiCollection
            size={uiStyle.iconSize}
            className="border p-1 rounded-full border-colorTextDarkBlue hover:border-blue-600"
          />
          <p className={uiStyle.iconText}>{uiContext.batch}</p>
        </div>
      </Link>
     ):(
<div className="items-center hover:bg-gray-500 hover:bg-opacity-10 p-3 rounded-lg hover:text-blue-600 flex flex-col space-y-3 cursor-not-allowed">
          <BiCollection
            size={uiStyle.iconSize}
            className="border p-1 rounded-full border-colorTextDarkBlue hover:border-blue-600"
          />
          <p className={uiStyle.iconText}>{uiContext.batch}</p>
        </div>
     )}
      
      {isStock(groups) ? (
        <Link to="/stock">
        <div className={uiStyle.icon}>
        <AiTwotoneContainer
          size={uiStyle.iconSize}
          className="border p-1 rounded-full border-colorTextDarkBlue hover:border-blue-600"
        />
        <p className={uiStyle.iconText}>{uiContext.stock}</p>
      </div>
        </Link>
      ):(
<div className="items-center hover:bg-gray-500 hover:bg-opacity-10 p-3 rounded-lg hover:text-blue-600 flex flex-col space-y-3 cursor-not-allowed">
        <AiTwotoneContainer
          size={uiStyle.iconSize}
          className="border p-1 rounded-full border-colorTextDarkBlue hover:border-blue-600"
        />
        <p className={uiStyle.iconText}>{uiContext.stock}</p>
      </div>
      )}
     {isStock(groups) ? (
      <Link to="/product">
      <div className={uiStyle.icon}>
        <MdProductionQuantityLimits
          size={uiStyle.iconSize}
          className="border p-1 rounded-full border-colorTextDarkBlue hover:border-blue-600"
        />
        <p className={uiStyle.iconText}>{uiContext.product}</p>
      </div>
      </Link>
     ):(
<div className="items-center hover:bg-gray-500 hover:bg-opacity-10 p-3 rounded-lg hover:text-blue-600 flex flex-col space-y-3 cursor-not-allowed">
        <MdProductionQuantityLimits
          size={uiStyle.iconSize}
          className="border p-1 rounded-full border-colorTextDarkBlue hover:border-blue-600"
        />
        <p className={uiStyle.iconText}>{uiContext.product}</p>
      </div>
     )}
      <Link to="/transfer">
      <div className={uiStyle.icon}>
        <GrSend
          size={uiStyle.iconSize}
          className="border p-1 rounded-full border-colorTextDarkBlue hover:border-blue-600"
        />
        <p className={uiStyle.iconText}>{uiContext.transaction}</p>
      </div>
      </Link>

      <Link to="/move">
      <div className={uiStyle.icon}>
        <BiTransfer
          size={uiStyle.iconSize}
          className="border p-1 rounded-full border-colorTextDarkBlue hover:border-blue-600"
        />
        <p className={uiStyle.iconText}>{uiContext.move}</p>
      </div>
      </Link>

      <Link to="/reduce">
      <div className={uiStyle.icon}>
        <RiFileReduceLine
          size={uiStyle.iconSize}
          className="border p-1 rounded-full border-colorTextDarkBlue hover:border-blue-600"
        />
        <p className={uiStyle.iconText}>{uiContext.reduce}</p>
      </div>
      </Link>


      <Link to="/account">
        <div className={uiStyle.icon}>
          <MdManageAccounts
            size={uiStyle.iconSize}
            className="border p-1 rounded-full border-colorTextDarkBlue hover:border-blue-600"
          />
          <p className={uiStyle.iconText}>{uiContext.account}</p>
        </div>
      </Link>

      <div onClick={logOutClicked} className={uiStyle.icon}>
        <SlLogout
          size={uiStyle.iconSize}
          className="border p-1 rounded-full border-colorTextDarkBlue hover:border-blue-600"
        />
        <p className={uiStyle.iconText}>{uiContext.logout}</p>
      </div>

    </section>
  );
  return content;
};

export default NavDesktop;
