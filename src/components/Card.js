import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
const Card = () => {
  const lang = localStorage.getItem("userLanguage");
  const { cartItems } = useSelector((state) => state?.cart);
  let count = 0;
  cartItems.map((item) => (count = count + item?.quantity));
  return (
    <>
      <div className=" pr-5">
        <Link
          to="account/card"
          className="text-center text-colorGreen hover:text-primary transition relative"
        >
          <div className="text-2xl">
            <FontAwesomeIcon icon={faShoppingBag} />
          </div>
          <div className="text-xs leading-3">
            {lang === "tm" ? "Sebet" : "Корзина"}
          </div>
          <div className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-colorRed text-white text-xs">
            {count}
          </div>
        </Link>
      </div>
    </>
  );
};

export default Card;
