import React from "react";
import { useState } from "react";
import { FaPen } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { nameHelperPallet } from "../../../../featuresSlice";

import isStockManager from "../../../../../utils/isStockManager";
import { ContainerPalletContext } from "../../../BatchContext";
import { getStock } from "../../../../stock/stockSlice";
const ContainerPalletView = () => {
  const  containerPallet  = useSelector((state) => state?.containerPallet);
  const dispatch = useDispatch();
  const [error, SetError] = useState("");
  const groups = useSelector((state) => state.login.groups);
  const { token } = useSelector((state) => state.login);
  const handleClick = async (e) => {
    e.preventDefault();

    await dispatch(getStock({ token }))
      .unwrap()
      .then((res) => {
        dispatch(nameHelperPallet("edit"));
      })
      .catch((err) => SetError(err.response));
  };
  return (
    <>
      <section className="text-lg mt-10 bg-white p-3 hover:shadow border m-4 py-4 rounded-lg font-poppins px-10">
        <div className="text-center overflow-auto flex items-center py-2">
          <div className="font-bold font-poppins text-colorTextDarkBlue text-xl grow">
            Palet Barada maglumat
          </div>
          <div className="flex items-center">
          {isStockManager(groups) ? (
            <div
              onClick={handleClick}
              className="mr-10 flex space-x-3 items-center justify-between  p-1 cursor-pointer text-lg font-bold font-poppins bg-blue-500 text-white text-center rounded-lg"
            >
              <FaPen />
            </div>
          ):("")}


            <div className="pr-5 text-red-600 cursor-pointer">
            <ImCross className="cursor-pointer" onClick={() => {
                dispatch(nameHelperPallet(""));
              }} size={20} />
            </div>
          </div>
        </div>

        <div className="text-center font-poppins font-bold text-red-600">
          {error}
        </div>
        <div className=" px-5 space-y-3 pt-3">
          <div className="flex-wrap desktop:grid desktop:grid-cols-2">
            <div className="grid grid-cols-2 items-center">
              <div className="grid grid-cols-1 whitespace-nowrap font-bold">{ContainerPalletContext.title}:</div>
              <div className="grid grid-cols-1 px-3 whitespace-nowrap">{containerPallet?.title}</div>
            </div>
            <div className="grid grid-cols-2 items-center">
              <div className="grid grid-cols-1 whitespace-nowrap font-bold">{ContainerPalletContext.code}:</div>
              <div className="grid grid-cols-1 px-3 whitespace-nowrap">{containerPallet?.code}</div>
            </div>
          </div>
          <div className="flex-wrap desktop:grid desktop:grid-cols-2">
            <div className="grid grid-cols-2 items-center">
              <div className="grid grid-cols-1 whitespace-nowrap font-bold">{ContainerPalletContext.description}:</div>
              <div className="grid grid-cols-1 px-3 whitespace-nowrap">{containerPallet?.description}</div>
            </div>
            <div className="grid grid-cols-2 items-center">
              <div className="grid grid-cols-1 whitespace-nowrap font-bold">{ContainerPalletContext.product}:</div>
              <div className="grid grid-cols-1 px-3 whitespace-nowrap">{containerPallet?.product?.title}</div>
            </div>

            <div className="grid grid-cols-2 items-center">
              <div className="grid grid-cols-1 whitespace-nowrap font-bold">{ContainerPalletContext.price}:</div>
              <div className="grid grid-cols-1 px-3 whitespace-nowrap">{containerPallet?.transfer_price}</div>
            </div>

            <div className="grid grid-cols-2 items-center">
              <div className="grid grid-cols-1 whitespace-nowrap font-bold">{ContainerPalletContext.cell}:</div>
              <div className="grid grid-cols-1 px-3 whitespace-nowrap">{containerPallet?.cell?.code}</div>
            </div>
          </div>
         
         
        </div>
      </section>
    </>
  );
};

export default ContainerPalletView;
