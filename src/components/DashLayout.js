import React from "react";
import { useLayoutEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Copyright from "./Copyright";
import Footer from "./Footer";
import Header from "./Header";
import Nav from "./Nav";
import SEO from "../config/seo";
import { screen_limit } from "../rootUrl";
import Mobile from "./Mobile";
const DashLayout = () => {
  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth]);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  }

  const [screen] = useWindowSize();


  if (screen < screen_limit) {
    return (
      <>
        <div className="flex-1 px-2  ">
          <Mobile />
        </div>
      </>
    );
  } else {
    return (
      <>
        <SEO />
        <div className="flex flex-col h-screen justify-between">
        <Header />
        <Nav />

        <div className="flex-1 px-2 bg-primaryBackground ">
          <Outlet />
        </div>

        <Footer />
        <Copyright />
        </div>
      </>
    );
  }
};

export default DashLayout;
