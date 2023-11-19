import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
const lang = localStorage.getItem("userLanguage");
const Wish = () => {
    const { wishlistItems } = useSelector((state) => state?.wishlist);
    let count = wishlistItems.length;
  return (
    <div className=" px-5">
      <Link
        to="/account/wishlist"
        className="text-center text-primary hover:text-primary transition relative"
      >
        <div className="text-2xl">
          <FontAwesomeIcon icon={faHeart} />
        </div>
        <div className="text-xs leading-3 text-black">
          {lang === "tm" ? "Halanlarym" : "Список желаний"}
        </div>
        <div className="absolute right-0 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-colorRed text-white text-xs">
          {count}
        </div>
      </Link>
    </div>
  );
};

export default Wish;
