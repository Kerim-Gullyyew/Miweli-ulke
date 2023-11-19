import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { deleteFromWishlist } from "../../store/features/wishlist/wishlistSlice";
import { backendUrl } from "../../rootUrl";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const WishList = () => {
  const dispatch = useDispatch();
  const { wishlistItems } = useSelector((state) => state?.wishlist);
  const lang = localStorage.getItem("userLanguage");
  return (
    <>
      <div className="col-span-9 space-y-4">
        {wishlistItems ? (
          <>
            {wishlistItems.map((item, key) => (
              <div
                key={key}
                className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded"
              >
                <div className="w-28">
                  <img
                    src={backendUrl + item?.main_image}
                    alt={lang === "tm" ? item?.title : item?.title_ru}
                    className="w-full"
                  />
                </div>
                <div className="w-1/3">
                  <h2 className="text-gray-800 text-xl font-medium uppercase">
                    {lang === "tm" ? item?.title : item?.title_ru}
                  </h2>
                </div>
                <div className="text-primary text-lg font-semibold">
                  {item?.newprice}{item?.get_newprice}
                  {lang === "tm" ? "m" : "м"}
                </div>
                <Link to={"/product/" + item?.id}>
                  <div
                    className="px-6 py-2 cursor-pointer text-center text-sm text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
                  >
                    {lang === 'tm' ? "Sebede goş" : "Корзина"}
                  </div>
                </Link>

                <div className="text-gray-600 cursor-pointer hover:text-primary">
                  <FontAwesomeIcon
                    onClick={() => dispatch(deleteFromWishlist(item))}
                    className="stroke-black stroke-2 hover:stroke-red-700"
                    icon={faTrash}
                  />
                </div>
              </div>
            ))}
          </>
        ) : (
          " "
        )}
      </div>
    </>
  );
};

export default WishList;
