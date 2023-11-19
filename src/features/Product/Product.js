import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  getSingleProduct,
  getFilterProducts,
} from "../../store/features/product/productSlice";
import {
  faHeart,
  faBagShopping,
  faChevronRight,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { backendUrl } from "../../rootUrl";
import {
  addToCart,
  decreaseQuantity,
} from "../../store/features/cart/cartSlice";
import { addToWishlist } from "../../store/features/wishlist/wishlistSlice";
import RelatedProducts from "./RelatedProducts";
const Product = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id !== undefined) {
      dispatch(getSingleProduct({ id: id }));
    }
  }, [dispatch, id]);

  const { cartItems } = useSelector((state) => state?.cart);
  const { singleProduct, options } = useSelector((state) => state?.product);
  const search = `?category=` + singleProduct?.category?.id + `&limit=5`;
  useEffect(() => {
    if (id !== undefined) {
      dispatch(getFilterProducts({ search }));
    }
  }, [dispatch, id, search]);

  const { wishlistItems } = useSelector((state) => state?.wishlist);
  const lang = localStorage.getItem("userLanguage");
  const [option, setOption] = useState("");
  useEffect(() => {
    if (options && options.length > 0 && option === "") {
      setOption(options[0]);
    }
  }, [setOption, option, options]);
  if (singleProduct && options) {
    let content = (
      <>
        {singleProduct ? (
          <>
            <div className="container py-4 flex items-center gap-3">
              <Link to="/" className="text-primary text-base">
                <FontAwesomeIcon icon={faHouse} />
              </Link>
              <span className="text-sm text-gray-400">
                <FontAwesomeIcon icon={faChevronRight} />
              </span>
              <p className="text-gray-600 font-medium">
                {lang === "tm" ? "Haryt" : "Товар"}
              </p>
            </div>

            <div className="container grid grid-cols-2 gap-6">
              <div>
                <img
                  src={
                    backendUrl +
                    (singleProduct?.options?.length > 1 &&
                    option !== null &&
                    option !== undefined
                      ? option?.image
                      : singleProduct?.main_image)
                  }
                  alt={
                    lang === "tm"
                      ? singleProduct?.title
                      : singleProduct?.title_ru
                  }
                  className="w-full"
                />
                <div className="grid grid-cols-5 gap-4 mt-4">
                  {singleProduct ? (
                    <>
                      {singleProduct?.images?.map((image, key) => (
                        <div key={key}>
                          <div className="space-y-2">
                            <div
                              className="inline-block rounded px-1 py-1 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                              data-te-toggle="modal"
                              data-te-target={`#exampleModalCenter` + key}
                              data-te-ripple-init
                              data-te-ripple-color="light"
                            >
                              <img
                                src={backendUrl + image?.image_mini}
                                alt={
                                  lang === "tm" ? image?.title : image?.title_ru
                                }
                                className="w-full cursor-pointer border border-primary"
                              />
                            </div>
                          </div>

                          <div
                            data-te-modal-init
                            className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
                            id={`exampleModalCenter` + key}
                            tabIndex="-1"
                            aria-labelledby="exampleModalCenterTitle"
                            aria-modal="true"
                            role="dialog"
                          >
                            <div
                              data-te-modal-dialog-ref
                              className="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]"
                            >
                              <div className="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none">
                                <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4">
                                  <h5
                                    className="text-xl font-medium leading-normal text-neutral-800"
                                    id="exampleModalScrollableLabel"
                                  >
                                    {lang === "tm"
                                      ? image?.title
                                      : image?.title_ru}
                                  </h5>

                                  <button
                                    type="button"
                                    className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                                    data-te-modal-dismiss
                                    aria-label="Close"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth="1.5"
                                      stroke="currentColor"
                                      className="h-6 w-6"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                      />
                                    </svg>
                                  </button>
                                </div>

                                <div className="relative p-4">
                                  <div>
                                    <img
                                      src={backendUrl + image?.image_mini}
                                      alt={
                                        lang === "tm"
                                          ? image?.title
                                          : image?.title_ru
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-medium uppercase mb-2">
                  {singleProduct?.options?.length > 1 &&
                  option !== null &&
                  option !== undefined
                    ? lang === "tm"
                      ? option?.title
                      : option?.title_ru
                    : lang === "tm"
                    ? singleProduct?.title
                    : singleProduct?.title_ru}
                </h2>
                <div className="space-y-2">
                  <p className="space-x-2">
                    <span className="text-gray-800 font-semibold ">
                      {lang === 'tm' ? "Brend": "Бренд"} :{" "}
                    </span>
                    <Link to={`/shop/?brand=` + singleProduct?.brand?.id}>
                      <span className="text-gray-600 hover:underline decoration-primary">
                        {singleProduct?.brand?.title}
                      </span>
                    </Link>
                  </p>
                  <p className="space-x-2">
                    <span className="text-gray-800 font-semibold">
                    {lang === 'tm' ? "Kategoriýa" : "Категория"}:{" "}
                    </span>
                    <span className="text-gray-600">
                      <Link
                        to={`/shop/?category=` + singleProduct?.category?.id}
                      >
                        <span className="text-gray-600 hover:underline decoration-primary">
                          {lang === "tm"
                            ? singleProduct?.category?.title
                            : singleProduct?.category?.title_ru}
                        </span>
                      </Link>
                    </span>
                  </p>
                </div>
                <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
                  <p className="text-xl text-primary font-semibold">
                    {singleProduct?.options?.length > 1 &&
                    option !== null &&
                    option !== undefined
                      ? option?.newprice
                      : singleProduct?.newprice}
                    {lang === "tm" ? "m" : "м"}
                  </p>
                  {singleProduct?.oldprice > singleProduct?.newprice ? (
                    <p className="text-base text-gray-400 line-through">
                      {singleProduct?.options?.length > 1 &&
                      option !== null &&
                      option !== undefined
                        ? option?.oldprice
                        : singleProduct?.oldprice}
                      {lang === "tm" ? "m" : "м"}
                    </p>
                  ) : (
                    " "
                  )}
                </div>

                <p className="mt-4 text-gray-600">
                  {lang === "tm"
                    ? singleProduct?.description
                    : singleProduct?.description_ru}
                </p>
                {singleProduct.options?.length <= 1 ? (
                  <>
                    {cartItems.map((cart, key) => (
                      <div key={key}>
                        <>
                          {cart?.id === options[0]?.id ? (
                            <div className="mt-4">
                              <>
                                <h3 className="text-sm text-gray-800 uppercase mb-1">
                                  {lang === "tm" ? "Sany" : "Количество"}
                                </h3>
                                <div className="flex border justify-between border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
                                  <div
                                    onClick={() =>
                                      dispatch(decreaseQuantity({ cart }))
                                    }
                                    className=" p-3 w-full text-xl flex items-center justify-center cursor-pointer select-none"
                                  >
                                    -
                                  </div>
                                  <div className=" p-3 w-full text-base flex items-center justify-center">
                                    {cart?.quantity}
                                  </div>
                                  <div
                                    onClick={() =>
                                      dispatch(
                                        addToCart({
                                          singleProduct,
                                          option: options[0],
                                        })
                                      )
                                    }
                                    className=" p-3 w-full text-xl flex items-center justify-center cursor-pointer select-none"
                                  >
                                    +
                                  </div>
                                </div>
                              </>
                            </div>
                          ) : (
                            ""
                          )}
                        </>
                      </div>
                    ))}
                  </>
                ) : (
                  ""
                )}
                <div className="flex max-w-xs">
                  {singleProduct.options?.length > 1 ? (
                    <>
                      {singleProduct.options.map((option, key) => (
                        <div
                          key={key}
                          onClick={() => {
                            setOption(singleProduct?.options[key]);
                          }}
                          className=" cursor-pointer relative rounded-lg bg-white px-3 mx-3 shadow-xl"
                        >
                          <img
                            className="rounded-t-lg"
                            src={backendUrl + option.image}
                            alt={
                              lang === "tm" ? option?.title : option?.title_ru
                            }
                          />
                          <div className="p-1">
                            <p className="mb-1 text-sm text-neutral-600">
                              {lang === "tm" ? option?.title : option?.title_ru}
                            </p>
                          </div>
                          {cartItems.map((cart, key) => (
                            <div key={key} className="pt-3">
                              {cart.id === option.id ? (
                                <div className="absolute inset-x-0 bg-gray-300 shadow-inner border-t-4 bottom-0 rounded-b-lg text-center mt-4 flex justify-between">
                                  <div
                                    className=" bg-primary text-white font-extrabold text-lg w-full rounded-lg"
                                    onClick={() =>
                                      dispatch(decreaseQuantity({ cart }))
                                    }
                                  >
                                    -
                                  </div>
                                  <div className=" w-full text-base">
                                    {cart.quantity}
                                  </div>
                                  <div
                                    className=" bg-primary text-white font-extrabold text-lg rounded-lg w-full"
                                    onClick={() =>
                                      dispatch(
                                        addToCart({ singleProduct, option })
                                      )
                                    }
                                  >
                                    +
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          ))}
                        </div>
                      ))}
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
                  {singleProduct.options?.length <= 1 ? (
                    <div
                      onClick={() =>
                        dispatch(
                          addToCart({ singleProduct, option: options[0] })
                        )
                      }
                      className="bg-primary border cursor-pointer border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition"
                    >
                      <FontAwesomeIcon icon={faBagShopping} />
                    </div>
                  ) : (
                    <>
                      <div
                        onClick={() =>
                          dispatch(addToCart({ singleProduct, option: option }))
                        }
                        className="bg-primary border cursor-pointer border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition"
                      >
                        <FontAwesomeIcon icon={faBagShopping} />
                      </div>
                    </>
                  )}

                  {wishlistItems?.find((el) => el?.id === singleProduct?.id) ? (
                    <div
                      onClick={() => dispatch(addToWishlist(singleProduct))}
                      className="border cursor-pointer border-gray-300 text-gray-600 px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:text-primary transition"
                    >
                      <FontAwesomeIcon
                        className="text-red-700"
                        icon={faHeart}
                      />{" "}
                      {lang === 'tm' ? "Halanlarym" : "Список желаний"}
                    </div>
                  ) : (
                    <div
                      onClick={() => dispatch(addToWishlist(singleProduct))}
                      className="border cursor-pointer border-gray-300 px-8 py-2 font-medium rounded uppercase flex items-center gap-2 transition"
                    >
                      <FontAwesomeIcon icon={faHeart} /> {lang === 'tm' ? "Halanlarym" : "Список желаний"}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <RelatedProducts />
          </>
        ) : (
          " "
        )}
      </>
    );

    return content;
  }
};

export default Product;
