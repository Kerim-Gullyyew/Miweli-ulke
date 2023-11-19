import React from "react";
import { Link } from "react-router-dom";
import holiday from "../img/offer.jpg";
const Ads = () => {
  return (
    <>
      <div className="container pb-6 ">
        <Link to="shop">
          <img
            src={holiday}
            alt="ads"
            className="w-full rounded-lg shadow-md h-60"
          />
        </Link>
      </div>
    </>
  );
};

export default Ads;
