import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Menu, Transition } from "@headlessui/react";
import {
  faLayerGroup,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Category from "./Category";
import rus from '../img/icons/rus.jpg';
import tkm from '../img/icons/tkm.jpg';
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Nav = () => {
  const categories = useSelector((state) => state?.info?.mainInfo?.categories);
  const { token } = useSelector((state) => state.auth);
  const lang = localStorage.getItem("userLanguage");
  const onSetUserLanguageTmClicked = (e) => {
    localStorage.setItem("userLanguage", "tm");
    window.location.reload(false);
    // navigate();
  };
  const onSetUserLanguageRuClicked = (e) => {
    localStorage.setItem("userLanguage", "ru");
    window.location.reload(false);
    // navigate();
  };
  return (
    <>
      <nav className=" bg-primary">
        <div className="container flex">
          {categories && categories.length > 0 ? (

          <Category categories={categories}/>
          ):("")}

          <div className="flex items-center justify-between flex-grow">
            <div className="flex items-center space-x-6 capitalize">
              <Link to="/brand">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <div className="inline-flex w-full justify-center rounded-full px-1 py-1 text-sm font-medium text-gray-700 shadow-sm">
                      <div className="text-lg">
                        <span className="text-white">
                          <FontAwesomeIcon icon={faLayerGroup} />
                        </span>
                        <span className="ml-2 text-base text-white">
                          {lang === "tm" ? "Brendler" : "Бренды"}
                        </span>
                      </div>
                    </div>
                  </div>
                </Menu>
              </Link>
              <Link
                to="/aboutUs"
                className="text-white transition"
              >
                {lang === "tm" ? "Biz barada" : "О нас"}
              </Link>

              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center rounded-full px-1 py-1 text-sm font-medium text-gray-700 shadow-sm">
                    <div className=" text-2xl">
                      <span className="text-white">
                        <FontAwesomeIcon icon={faGlobe} />
                      </span>
                    </div>
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute z-10 mt-2 w-48 origin-top-right rounded-b-xl bg-primaryBackground shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            onClick={onSetUserLanguageTmClicked}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "flex items-center px-2 py-2 text-md font-semibold cursor-pointer"
                            )}
                          >
                            <img src={tkm} className="px-2 rounded-xl" alt="sdf" />
                            {lang === "tm"
                              ? "Türkmen"
                              : "Туркменский"}
                          </div>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            onClick={onSetUserLanguageRuClicked}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              " px-2 py-2 flex items-center text-md font-semibold cursor-pointer"
                            )}
                          >
                            <img src={rus} className="px-2 rounded-xl" alt="sdf" />
                            {lang === "tm" ? "Rus" : "Русский"}
                          </div>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
            <div>
              
              {token.length === 0 ? (
                <>
                <div className=" flex">
                <Login />
                <Register />
                </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
