import React from "react";
import { Link } from "react-router-dom";
import logo from "../img/logo.png";
import Wish from "./Wish";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Card from "./Card";
import Search from "./Search";
const Header = () => {
  const lang = localStorage.getItem("userLanguage");
  const { token } = useSelector((state) => state.auth);
  return (
    <header className="py-2 shadow-inner shadow-neutral-400 bg-slate-50">
      <div className="container flex items-center justify-between">
        <Link to="/">
          <img src={logo} alt="Logo" className=" w-52 " />
        </Link>

        <Search/>

        <div className="flex items-center space-x-4 px-6">
          <Wish/>
          <Card/>
        
          {token.length === 0 ? (
            ""
          ):(
          <div className=" pr-5">
            <Link
              to="account"
              className="text-center text-primary hover:text-primary transition relative"
            >
              <div className="text-2xl">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div className="text-xs leading-3">{lang === 'tm' ? "Akkaundym" : "Мой акаунт"}</div>

            </Link>
          </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
