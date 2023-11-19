import React from 'react'
import Sidebar from "./Sidebar";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHouse,
    faChevronRight,
  } from "@fortawesome/free-solid-svg-icons";
import { Outlet } from 'react-router-dom';
  
const AccountLayout = () => {
  const lang = localStorage.getItem("userLanguage");
  return (
    <>
      <div className="container py-4 flex items-center gap-3">
        <Link to="/" className="text-primary text-base">
            <FontAwesomeIcon icon={faHouse} />
        </Link>
        <span className="text-sm text-gray-400">
            <FontAwesomeIcon icon={faChevronRight} />
        </span>
        <p className="text-gray-600 font-medium">{lang === 'tm' ? 'Akaunt' : "Акаунт"}</p>
      </div>

      <div className="container grid grid-cols-12 items-start gap-6 pt-4 pb-16">
        <Sidebar/>
        <Outlet/>
      </div>
    </>
  )
}

export default AccountLayout