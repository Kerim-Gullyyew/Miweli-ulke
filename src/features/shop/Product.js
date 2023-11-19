import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { backendUrl } from "../../rootUrl";
import { faHeart, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { addToWishlist } from "../../store/features/wishlist/wishlistSlice";
const Product = ({products}) => {
    const lang = localStorage.getItem("userLanguage");
    const { cartItems } = useSelector((state) => state?.cart);
    const { wishlistItems } = useSelector((state) => state?.wishlist);
    const dispatch = useDispatch();

  return (
    <>
      {products?.map((nproduct, key) => (
        <div
          key={key}
          className="bg-white shadow-lg rounded-lg overflow-hidden group"
        >
          <div className="group h-full relative block bg-primary rounded-lg">
            <img
              alt={lang === "tm" ? nproduct?.title : nproduct?.title_ru}
              src={backendUrl + nproduct?.main_image}
              className="absolute inset-0 w-full h-full object-fill transition-opacity group-hover:opacity-50"
            />

            <div className="relative p-4 sm:p-6 lg:p-8">
              <div className="absolute translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100 justify-between inset-0 flex">
                <div className="text-white w-10 font-extrabold line-through decoration-red-600 m-2 h-10 rounded-full flex items-center justify-center transition">
                  {products.get_oldprice > 0
                    ? nproduct.get_oldprice`man`
                    : " "}
                </div>
              </div>

              <div className=" mt-5">
                <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                  <Link
                    to={"/product/" + nproduct.id}
                    className="text-sm text-white"
                  >
                    {lang === "tm"
                      ? nproduct?.title
                      : nproduct?.title_ru}
                  </Link>
                  <div className="flex pt-10 justify-between">
                    {wishlistItems.find((el) => el.id === nproduct.id) ? (
                      <FontAwesomeIcon
                        onClick={() => dispatch(addToWishlist(nproduct))}
                        icon={faHeart}
                        bounce
                        size="2xl"
                        className="stroke-black cursor-pointer stroke-2 hover:stroke-red-700 text-red-700"
                      />
                    ) : (
                      <FontAwesomeIcon
                        onClick={() => dispatch(addToWishlist(nproduct))}
                        icon={faHeart}
                        bounce
                        size="2xl"
                        className="stroke-black cursor-pointer stroke-2 hover:stroke-red-700 text-white"
                      />
                    )}
                    <div className="text-lg font-extrabold text-white">
                      {nproduct?.get_newprice} m
                    </div>
                    {cartItems.find((el) => el.id === nproduct.id) ? (
                      <Link to={"/product/" + nproduct?.id}>
                      <FontAwesomeIcon
                        icon={faCartShopping}
                        bounce
                        size="2xl"
                        className="stroke-black cursor-pointer stroke-2 hover:stroke-red-700 text-red-700"
                      />
                      </Link>
                    ) : (
                      <Link to={"/product/" + nproduct?.id}>
                      <FontAwesomeIcon
                        icon={faCartShopping}
                        bounce
                        size="2xl"
                        className="stroke-black cursor-pointer stroke-2 hover:stroke-red-700 text-white"
                      />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Product;
