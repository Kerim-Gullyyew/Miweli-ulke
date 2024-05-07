import React, { useState } from "react";
import person from "../../assets/person.jpg";

import { uiStyle } from "./uiStyle";
import { uiContext } from "./uiContext";

import { BiCollection, BiTransfer } from "react-icons/bi";
import { TbBrandProducthunt } from "react-icons/tb";
import { VscAccount } from "react-icons/vsc";
import { AiTwotoneContainer } from "react-icons/ai";
import { GrSend, GrTransaction } from "react-icons/gr";
import { BsGear } from "react-icons/bs";
import { SlLogout } from "react-icons/sl";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../features/auth/login/loginSlice";
import { backendUrl } from "../../data/ConstTexts";
import { MdManageAccounts, MdProductionQuantityLimits } from "react-icons/md";
import isStock from "../../utils/isStock";
import isEmployee from "../../utils/isEmployee";
import { RiFileReduceLine } from "react-icons/ri";
const Sidebar = () => {
  const { token } = useSelector((state) => state.login);
  const [error, SetError] = useState("");
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.login.profile);
  const groups = useSelector((state) => state.login.groups);

  const logOutClicked = async (e) => {
    e.preventDefault();
    await dispatch(logoutUser());
    return {};
  };

  // import isStock from "../../../../utils/isOdd";

  // isStock
  // isStockManager
  // isEmployee
  // isEmployyeManager

  let content = (
    <div className=" w-56 bg-white mr-3 rounded-lg hidden desktop:flex">
      <div className="px-2 pt-3 pb-8">
        <ul className="space-y-5 text-colorTextDarkBlue">
          <li>
            <Link to="/">
              <div className=" font-sans text-xl font-bold flex items-center justify-between py-1.5 px-4 rounded cursor-pointer">
                <span className="items-center text-colorBlue ">Dashboard</span>
              </div>
            </Link>
          </li>
          <li className="flex">
            <img
              src={backendUrl + profile.image}
              alt="person"
              className="rounded-full w-[50px] h-[50px] mr-3"
            />
            <div>
              <p className="font-bold font-poppins text-base">
                {profile.first_name} {profile.last_name}
              </p>
            </div>
          </li>
          <hr className=" border border-colorBorder" />
          <li>
            {isStock(groups) ? (
              <Link to="/batch">
                <div className={uiStyle.iconSidebar}>
                  <BiCollection
                    size={uiStyle.iconSize}
                    className="border p-1 rounded-full border-colorTextDarkBlue hover:border-blue-600"
                  />
                  <span className={uiStyle.iconTextSidebar}>
                    {uiContext.batch}
                  </span>
                </div>
              </Link>
            ) : (
              <div disabled className="hover:bg-gray-500 hover:bg-opacity-10 hover:text-blue-600 flex items-center py-1.5  rounded space-x-2 cursor-not-allowed">
                <BiCollection
                  size={uiStyle.iconSize}
                  className="border p-1 rounded-full border-colorTextDarkBlue hover:border-blue-600"
                />
                <span className={uiStyle.iconTextSidebar}>
                  {uiContext.batch}
                </span>
              </div>
            )}
          </li>

          <li>
            {isStock(groups) ? (
              <Link to="/stock">
              <div className={uiStyle.iconSidebar}>
                <AiTwotoneContainer
                  size={uiStyle.iconSize}
                  className="border p-1 rounded-full border-colorTextDarkBlue hover:border-blue-600"
                />
                <span className={uiStyle.iconTextSidebar}>{uiContext.stock}</span>
              </div>
              </Link>

            ) : (
              <div disabled className="hover:bg-gray-500 hover:bg-opacity-10 hover:text-blue-600 flex items-center py-1.5  rounded space-x-2 cursor-not-allowed">
                <AiTwotoneContainer
                  size={uiStyle.iconSize}
                  className="border p-1 rounded-full border-colorTextDarkBlue hover:border-blue-600"
                />
                <span className={uiStyle.iconTextSidebar}>{uiContext.stock}</span>
              </div>

            )}
          </li>
          <li>
            {isStock(groups) ? (
              <Link to="/product">
              <div className={uiStyle.iconSidebar}>
                <MdProductionQuantityLimits
                  size={uiStyle.iconSize}
                  className="border p-1 rounded-full border-colorTextDarkBlue hover:border-blue-600"
                />
                <span className={uiStyle.iconTextSidebar}>
                  {uiContext.product}
                </span>
              </div>
              </Link>

            ) : (
              <div className="hover:bg-gray-500 hover:bg-opacity-10 hover:text-blue-600 flex items-center py-1.5  rounded space-x-2 cursor-not-allowed">
                <MdProductionQuantityLimits
                  size={uiStyle.iconSize}
                  className="border p-1 rounded-full border-colorTextDarkBlue hover:border-blue-600"
                />
                <span className={uiStyle.iconTextSidebar}>
                  {uiContext.product}
                </span>
              </div>
            )}
          </li>
          <li>
              <Link to="/transfer">
            <div className={uiStyle.iconSidebar}>
              <GrSend
                size={uiStyle.iconSize}
                className="border p-1 rounded-full border-colorTextDarkBlue hover:border-blue-600"
              />
              <span className={uiStyle.iconTextSidebar}>
                {uiContext.transaction}
              </span>
            </div>
              </Link>

          </li>

          <li>
              <Link to="/move">
            <div className={uiStyle.iconSidebar}>
              <BiTransfer
                size={uiStyle.iconSize}
                className="border p-1 rounded-full border-colorTextDarkBlue hover:border-blue-600"
              />
              <span className={uiStyle.iconTextSidebar}>
                {uiContext.move}
              </span>
            </div>
              </Link>

          </li>

          <li>
              <Link to="/reduce">
            <div className={uiStyle.iconSidebar}>
              <RiFileReduceLine
                size={uiStyle.iconSize}
                className="border p-1 rounded-full border-colorTextDarkBlue hover:border-blue-600"
              />
              <span className={uiStyle.iconTextSidebar}>
                {uiContext.reduce}
              </span>
            </div>
              </Link>

          </li>

          <li>
            <Link to="/account">
              <div className={uiStyle.iconSidebar}>
                <MdManageAccounts
                  size={uiStyle.iconSize}
                  className="border p-1 rounded-full border-colorTextDarkBlue hover:border-blue-600"
                />
                <span className={uiStyle.iconTextSidebar}>
                  {uiContext.account}
                </span>
              </div>
            </Link>
          </li>

          <li>
            <div className={uiStyle.iconSidebar}>
              <BsGear
                size={uiStyle.iconSize}
                className="border p-1 rounded-full border-colorTextDarkBlue hover:border-blue-600"
              />
              <span className={uiStyle.iconTextSidebar}>
                {uiContext.setting}
              </span>
            </div>
          </li>

          <li>
            <div onClick={logOutClicked} className={uiStyle.iconSidebar}>
              <SlLogout
                size={uiStyle.iconSize}
                className="border p-1 rounded-full border-colorTextDarkBlue hover:border-blue-600"
              />
              <span className={uiStyle.iconTextSidebar}>
                {uiContext.logout}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
  return content;
};

export default Sidebar;
