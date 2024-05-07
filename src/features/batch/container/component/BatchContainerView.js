import React from "react";
import { FaPen } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { nameHelperHelper } from "../../../featuresSlice";
import isStockManager from "../../../../utils/isStockManager";
import { ContainerDetailContext } from "../../BatchContext";
const BatchContainerView = () => {
  const  containerDetail  = useSelector((state) => state?.containerDetail);
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.login.groups);
  return (
    <>
      <section className="text-lg mt-10 bg-white p-3 hover:shadow border m-4 py-4 rounded-lg font-poppins px-10">
        <div className="text-center overflow-auto flex items-center py-2">
          <div className="font-bold font-poppins text-colorTextDarkBlue text-xl grow">
          TIR Barada maglumat
          </div>
          <div className="flex items-center">
          {isStockManager(groups) ? (
            <div
              onClick={() => {
                dispatch(nameHelperHelper("edit"));
              }}
              className="mr-10 flex space-x-3 items-center justify-between  p-1 cursor-pointer text-lg font-bold font-poppins bg-blue-500 text-white text-center rounded-lg"
            >
              <FaPen />
            </div>
          ):("")}


            <div className="pr-5 text-red-600 cursor-pointer">
            <ImCross className="cursor-pointer" onClick={() => {
                dispatch(nameHelperHelper(""));
              }} size={20} />
            </div>
          </div>
        </div>

      
        <div className=" px-5 space-y-3 pt-3">
          <div className="flex-wrap desktop:grid desktop:grid-cols-2">
            <div className="grid grid-cols-2 items-center">
              <div className="grid grid-cols-1 whitespace-nowrap font-bold">{ContainerDetailContext.title}:</div>
              <div className="grid grid-cols-1 px-3 whitespace-nowrap">{containerDetail.info.title}</div>
            </div>
            <div className="grid grid-cols-2 items-center">
              <div className="grid grid-cols-1 whitespace-nowrap font-bold">{ContainerDetailContext.id_number}:</div>
              <div className="grid grid-cols-1 px-3 whitespace-nowrap">{containerDetail.info.id_number}</div>
            </div>
          </div>
          <div className="flex-wrap desktop:grid desktop:grid-cols-2">
            <div className="grid grid-cols-2 items-center">
              <div className="grid grid-cols-1 whitespace-nowrap font-bold">{ContainerDetailContext.type_code}:</div>
              <div className="grid grid-cols-1 px-3 whitespace-nowrap">{containerDetail.info.type_code}</div>
            </div>
            <div className="grid grid-cols-2 items-center">
              <div className="grid grid-cols-1 whitespace-nowrap font-bold">{ContainerDetailContext.pallet_count}:</div>
              <div className="grid grid-cols-1 px-3 whitespace-nowrap">{containerDetail.info.pallet_count}</div>
            </div>
          </div>
          <div className="flex-wrap desktop:grid desktop:grid-cols-2">
            <div className="grid grid-cols-2 items-center">
              <div className="grid grid-cols-1 whitespace-nowrap font-bold">{ContainerDetailContext.created_at}:</div>
              <div className="grid grid-cols-1 px-3 whitespace-nowrap">{containerDetail.info.created_at}</div>
            </div>
            <div className="grid grid-cols-2 items-center">
              <div className="grid grid-cols-1 whitespace-nowrap font-bold">{ContainerDetailContext.updated_at}:</div>
              <div className="grid grid-cols-1 px-3 whitespace-nowrap">{containerDetail.info.updated_at}</div>
            </div>
          </div>
         
        </div>
      </section>
    </>
  );
};

export default BatchContainerView;
