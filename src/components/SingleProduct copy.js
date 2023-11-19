import React from "react";
import { Link } from "react-router-dom";
import { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { backendUrl } from "../rootUrl";
import { faHeart, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { addToWishlist } from "../store/features/wishlist/wishlistSlice";
const SingleProduct = ({ nproducts }) => {
  const lang = localStorage.getItem("userLanguage");
  const { cartItems } = useSelector((state) => state?.cart);
  const { wishlistItems } = useSelector((state) => state?.wishlist);
  const dispatch = useDispatch();
  let limit = 5;

  // let screen = window.innerWidth;
  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  }

  const [screen] = useWindowSize();  

  if (screen > 767 && screen < 1024) {
    limit = 3;
  }else if(screen >= 1024 && screen < 1280){
    limit = 4;
  }
   else if (screen < 768 && screen > 637) {
    limit = 2;
  } else if (screen < 638) {
    limit = 1;
  }



  return (
    <>
      {nproducts?.slice(0, limit)?.map((nproduct, key) => (
        <div
          key={key}
          className="bg-white shadow-lg rounded-lg group"
        >
          <div className="group h-full relative bg-primary rounded-lg">

            <img
              alt={lang === "tm" ? nproduct?.title : nproduct?.title_ru}
              src={backendUrl + nproduct?.main_image}
              className="absolute inset-0 w-full object-cover transition-opacity group-hover:opacity-50"
            />
            <div className="relative p-4 sm:p-6 lg:p-8">
          
              <div className="mt-20 xl:mt-32">
                <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                  <Link
                    to={"/product/" + nproduct.id}
                    className="text-sm text-white items-center text-center justify-center flex"
                  >
                    {lang === "tm"
                      ? nproduct?.title
                      : nproduct?.title_ru}
                  </Link>
                  <div className="flex pt-10 justify-between">
                    {wishlistItems?.find((el) => el?.id === nproduct?.id) ? (
                      <FontAwesomeIcon
                        onClick={() => dispatch(addToWishlist(nproduct))}
                        icon={faHeart}
                        bounce
                        size="xl"
                        className="stroke-black cursor-pointer stroke-2 hover:stroke-red-700 text-red-700"
                      />
                    ) : (
                      <FontAwesomeIcon
                        onClick={() => dispatch(addToWishlist(nproduct))}
                        icon={faHeart}
                        bounce
                        size="xl"
                        className="stroke-black cursor-pointer stroke-2 hover:stroke-red-700 text-white"
                      />
                    )}
                    <div className="text-lg font-extrabold text-white">
                      {nproduct?.get_newprice} {lang === 'tm' ? "m" : "м"}
                    </div>
                    {cartItems.find((el) => el?.id === nproduct?.id) ? (
                      <Link to={"/product/" + nproduct?.id}>
                        <FontAwesomeIcon
                          icon={faCartShopping}
                          bounce
                          size="xl"
                          className="stroke-black cursor-pointer stroke-2 hover:stroke-red-700 text-red-700"
                        />
                      </Link>
                    ) : (
                      <Link to={"/product/" + nproduct.id}>
                        <FontAwesomeIcon
                          icon={faCartShopping}
                          bounce
                          size="xl"
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

export default SingleProduct;
