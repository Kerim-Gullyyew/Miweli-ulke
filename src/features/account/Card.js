import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { backendUrl } from "../../rootUrl";
import SEO from "../../config/seo";
import {
  increaseQuantity,
  decreaseQuantity,
  deleteFromCart,
} from "../../store/features/cart/cartSlice";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const Card = () => {
  const dispatch = useDispatch();
  let sum = 0;
  const lang = localStorage.getItem("userLanguage");
  const { cartItems } = useSelector((state) => state?.cart);
  cartItems.map((item) => (sum = sum + item.quantity * item.newprice));
  return (
    <>
      <SEO
        titleTemplate={lang === "tm" ? "Sebet" : "Корзина"}
        description="Sebet, sebetdäki harytlar, zakaz etmek, Корзина"
      />
      {cartItems ? (
        <div className="col-span-9 space-y-4">
          {cartItems?.map((item, key) => (
            <div
              key={key}
              className="flex items-center justify-between border gap-6 border-gray-200 rounded"
            >
              <div className="w-28">
                <img
                  src={backendUrl + item?.image}
                  alt={lang === "tm" ? item?.title : item?.title_ru}
                  className="w-full"
                />
              </div>

              <div className="w-1/3">
                <h2 className="text-gray-800 text-xl font-medium uppercase">
                  {lang === "tm" ? item?.title : item?.title_ru}
                </h2>
              </div>
              <div>
                <div className="pb-2 text-center font-extrabold text-primary">
                  {item?.newprice * item?.quantity} {lang === "tm" ? "m" : "м"}.
                </div>
                <div className="text-primary rounded-lg text-lg flex justify-between font-semibold">
                  {item?.quantity === 1 ? (
                    <FontAwesomeIcon
                      onClick={() => dispatch(decreaseQuantity({ cart: item }))}
                      className="px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white  font-medium rounded-md"
                      icon={faTrash}
                    />
                  ) : (
                    <button
                      onClick={() => dispatch(decreaseQuantity({ cart: item }))}
                      className="px-3 bg-yellow-500 hover:bg-yellow-600 text-white text-lg font-medium rounded-md"
                    >
                      -
                    </button>
                  )}

                  <div className=" mx-5">{item?.quantity}</div>
                  <button
                    onClick={() => dispatch(increaseQuantity(item))}
                    className="px-3 bg-green-500 hover:bg-green-600 text-white text-lg font-medium rounded-md"
                  >
                    +
                  </button>
                </div>
              </div>
              <div
                onClick={() => dispatch(deleteFromCart(item))}
                className="text-gray-600 cursor-pointer hover:text-primary"
              >
                <FontAwesomeIcon
                  className="stroke-black stroke-2 hover:stroke-red-700"
                  icon={faTrash}
                />
              </div>
            </div>
          ))}
          <div className=" bg-white p-5 flex justify-between">
            <div className=" flex">
              <div className="px-5 text-lg font-semibold">
                {lang === 'tm' ? "Jemi:" : "Сумма:"}
                </div>
              <div className="px-5 text-lg font-semibold">
                {sum}
                {"  "}{lang === 'tm' ? "man" : "ман"}
              </div>
            </div>
            {cartItems && cartItems.length > 0 ? (
              <div>
                <Link to="/order/create">
                  <button className="px-3 bg-green-500 hover:bg-green-600 text-white text-lg font-medium rounded-md">
                  {lang === 'tm' ? "Zakaz etmek" : "Заказывать"}
                    
                  </button>
                </Link>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Card;
