import React from "react";
import { Outlet } from "react-router-dom";
import NavMobile from "../components/ui/NavMobile";
import NavDesktop from "../components/ui/NavDesktop";
import Sidebar from "../components/ui/Sidebar";
import Copyright from "../components/ui/Copyright";
const DashLayout = () => {
  return (
    <>
      <div className="flex flex-col px-2 h-screen bg-colorBackground justify-between">
        {/* Nav */}
        <NavMobile />
        {/* EndNav */}

        {/* Nav Desktop */}
        <NavDesktop />
        {/* End Nav Desktop */}

        <div className="w-full mt-3 bg-colorBackground flex flex-1  ">
          <Sidebar />
          <div className="flex-1 mx-3 overflow-auto rounded-lg bg-colorBackground">
            <Outlet />
          </div>
        </div>

        <Copyright />
      </div>
    </>
  );
};

export default DashLayout;
