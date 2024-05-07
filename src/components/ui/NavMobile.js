import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import { backendUrl, projectName } from "../../data/ConstTexts";
import { BsFillGridFill, BsGear, BsXLg } from "react-icons/bs";
import person from "../../assets/person.jpg";
import { useDispatch, useSelector } from "react-redux";
import { uiContext } from "./uiContext";
import { uiStyle } from "./uiStyle";
import { Link } from "react-router-dom";
import { BiCollection, BiTransfer } from "react-icons/bi";
import { AiTwotoneContainer } from "react-icons/ai";
import { SlLogout } from "react-icons/sl";
import { logoutUser } from "../../features/auth/login/loginSlice";
import { MdManageAccounts, MdProductionQuantityLimits } from "react-icons/md";
const NavMobile = () => {
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.login.profile);

  const logOutClicked = async (e) => {
    e.preventDefault();
    await dispatch(logoutUser());
    return {};
  };
  const [toggle, setToggle] = useState(false);
  let content = (
    <nav className="w-full shadow z-30 flex py-3 desktop:py-0 items-center justify-between desktop:bg-colorBackground bg-white border-b-2 border-colorBorder">
      <img src={logo} alt="logo" className="w-[100px] pl-3" />
      <div className="text-black font-poppins font-bold text-lg">
        {projectName}
      </div>

      <div
        onClick={() => setToggle(!toggle)}
        className="flex desktop:invisible pr-3 text-colorTextDarkBlue"
      >
        {toggle ? <BsXLg size={35} /> : <BsFillGridFill size={35} />}
      </div>
      <div
        className={`${
          !toggle ? "hidden" : "flex"
        } p-3 desktop:hidden border-l-2 border-colorBorder bg-white absolute top-[53px] right-0 mx-2 my-2 min-w-[200px]`}
      >
        <div className="flex-col divide-y-2 divide-colorBorder">
          <div className=" items-center flex pb-3">
            <ul className="list-none flex justify-end items-start flex-1 flex-col">
              <li
                className={
                  "font-poppins pb-2 font-bold cursor-pointer text-[25px] text-colorBlue"
                }
              >
                Baş sahypa
              </li>
              <li className={"font-poppins font-bold text-[20px] text-black"}>
                {profile.first_name}{" "+ profile.last_name}
              </li>
            </ul>
            <img
              src={backendUrl + profile.image}
              alt="person"
              className=" w-[100px] h-[100px] rounded-full"
            />
          </div>
          <div className="py-3">
            <ul className="text-colorTextDarkBlue space-y-3">
              <Link to="/batch">
                <li className={uiStyle.iconListMobile}>
                  <BiCollection
                    size={uiStyle.iconSize}
                    className="border p-1 rounded-full border-colorTextDarkBlue hover:border-blue-600"
                  />
                  <h2 className={uiStyle.iconTextMobile}>{uiContext.batch}</h2>
                </li>
              </Link>
              <Link to="/stock">
              <li className={uiStyle.iconListMobile}>
                <AiTwotoneContainer
                  size={uiStyle.iconSize}
                  className="border p-1 rounded-full border-colorTextDarkBlue hover:border-blue-600"
                />
                <h2 className={uiStyle.iconTextMobile}>{uiContext.stock}</h2>
              </li>
              </Link>
              <Link to="/product">
              <li className={uiStyle.iconListMobile}>
                <MdProductionQuantityLimits
                  size={uiStyle.iconSize}
                  className="border p-1 rounded-full border-colorTextDarkBlue hover:border-blue-600"
                />
                <h2 className={uiStyle.iconTextMobile}>{uiContext.product}</h2>
              </li>
              </Link>
              <Link to="/transfer">
              <li className={uiStyle.iconListMobile}>
                <BiTransfer
                  size={uiStyle.iconSize}
                  className="border p-1 rounded-full border-colorTextDarkBlue hover:border-blue-600"
                />
                <h2 className={uiStyle.iconTextMobile}>
                  {uiContext.transaction}
                </h2>
              </li>
              </Link>
              <Link to="/account">
                <li className={uiStyle.iconListMobile}>
                  <MdManageAccounts
                    size={uiStyle.iconSize}
                    className="border p-1 rounded-full border-colorTextDarkBlue hover:border-blue-600"
                  />
                  <h2 className={uiStyle.iconTextMobile}>
                    {uiContext.account}
                  </h2>
                </li>
              </Link>
            </ul>
          </div>
          <div className="text-lg space-y-3 py-2 font-poppins text-colorTextDarkBlue font-bold flex-col">
            <div className={uiStyle.iconListMobile}>
              <BsGear
                size={uiStyle.iconSize}
                className="border p-1 rounded-full border-colorTextDarkBlue hover:border-blue-600"
              />
              <div className="pl-5">{uiContext.setting}</div>
            </div>
            <div onClick={logOutClicked} className={uiStyle.iconListMobile}>
              <SlLogout
                size={uiStyle.iconSize}
                className="border p-1 rounded-full border-colorTextDarkBlue hover:border-blue-600"
              />
              <div className="pl-5">{uiContext.logout}</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
  return content;
};

export default NavMobile;
