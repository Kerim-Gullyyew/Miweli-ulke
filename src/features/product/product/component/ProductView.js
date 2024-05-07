import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductDetail } from "../productDetailSlice";
import { ProductContext, ProductStatusContext } from "../../ProductContext";
import { name } from "../../../featuresSlice";
import { FaPen, FaPlus } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import isStockManager from "../../../../utils/isStockManager";
import { backendUrl } from "../../../../data/ConstTexts";
import Loader from "../../../../utils/Loader";
const ProductView = () => {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.login.groups);
  const { id } = useParams();
  const { token } = useSelector((state) => state.login);
  const [error, SetError] = useState("");
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (id !== undefined) {
  //     let isCancelled = false;
  //     dispatch(getProductDetail({ id: id, token }))
  //       .unwrap()
  //       .catch((err) => SetError(err));
  //     return () => {
  //       isCancelled = true;
  //     };
  //   }
  // }, [dispatch, id, token]);
  const productDetail = useSelector((state) => state.productDetail);
  const isLoading = useSelector((state) => state.productDetail.isLoading);
  let content = (
    <>
      <section className="text-lg mx-10 font-poppins ">
        <div className="text-center flex bg-colorSecondaryBorder items-center rounded-t-xl py-2">
          <div className="font-bold font-poppins text-lg grow">
            Harytlar barada maglumat
          </div>

          <div className="flex items-center">
            {isStockManager(groups) ? (
              <>
                <div
                  onClick={() => {
                    dispatch(name("edit"));
                  }}
                  className="mr-10 flex items-center justify-between p-1  cursor-pointer text-lg font-bold font-poppins bg-blue-500 text-white space-x-3 text-center rounded-lg"
                >
                  <FaPen />
                </div>
                <div
                  onClick={() => {
                    dispatch(name("new"));
                  }}
                  className="mr-10 flex items-center justify-between p-1 cursor-pointer  text-lg font-bold font-poppins bg-blue-600 text-white space-x-3 text-center rounded-lg"
                >
                  <FaPlus />
                </div>
              </>
            ) : (
              ""
            )}

            <div className="pr-5 text-red-600 cursor-pointer">
              <ImCross className="cursor-pointer" onClick={() => navigate(-1)} size={20} />
            </div>
          </div>
        </div>
        <hr className="border border-colorBorder" />

        <div className="text-center font-poppins font-bold text-red-600">
          {error}
        </div>
        <div className=" px-5 space-y-3 pt-3 bg-white  rounded-lg p-3 hover:shadow">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <div className="grid grid-cols-10 items-center">
                <div className="grid col-span-3 font-bold">
                  {ProductContext.code}:
                </div>
                <div className="grid col-span-7">{productDetail.code}</div>
              </div>
              <div className="grid grid-cols-10 items-center">
                <div className="grid col-span-3 font-bold">
                  {ProductContext.title}:
                </div>
                <div className="grid col-span-7">{productDetail.title}</div>
              </div>
              <div className="grid grid-cols-10 items-center">
                <div className="grid col-span-3 font-bold">
                  {ProductContext.description}:
                </div>
                <div className="grid col-span-7">
                  {productDetail.description}
                </div>
              </div>
              <div className="grid grid-cols-10 items-center">
                <div className="grid col-span-3 font-bold">
                  {ProductContext.price}:
                </div>
                <div className="grid col-span-7">{productDetail.price}</div>
              </div>
              <div className="grid grid-cols-10 items-center">
                <div className="grid col-span-3 font-bold">
                  {ProductContext.unit}:
                </div>
                <div className="grid col-span-7">{productDetail.unit}</div>
              </div>
              <div className="grid grid-cols-10 items-center">
                <div className="grid col-span-3 font-bold">
                  {ProductContext.status}:
                </div>
                <div className="grid col-span-7">
                  {productDetail.is_active
                    ? ProductStatusContext.active
                    : ProductStatusContext.inactive}
                </div>
              </div>
              <div className="grid grid-cols-10 items-center">
                <div className="grid col-span-3 font-bold">
                  {ProductContext.image}:
                </div>
                <div className="grid col-span-7">
                  <img
                    className=" w-32 h-32 object-contain"
                    src={backendUrl + productDetail.image}
                    alt="img"
                  />
                </div>
              </div>
              <div className="grid grid-cols-10 items-center">
                <div className="grid col-span-3 font-bold">
                  {ProductContext.qrcode}:
                </div>
                <div className="grid col-span-7">
                  <img
                    className=" w-32 h-32 object-contain"
                    src={backendUrl + productDetail.qrcode}
                    alt="qrcode"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
  return content;
};

export default ProductView;
