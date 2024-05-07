import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getBatchDetail } from "../batchDetailSlice";
import { BatchContext } from "../../BatchContext";
import { name } from "../../../featuresSlice";
import { FaPen, FaPlus } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import isStockManager from "../../../../utils/isStockManager";
import Loader from "../../../../utils/Loader";
const BatchView = () => {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.login.groups);
  const { id } = useParams();
  const { token } = useSelector((state) => state.login);
  const [error, SetError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (id !== undefined) {
      dispatch(getBatchDetail({ id: id, token }))
        .unwrap()
        .catch((err) => SetError(err));
      return () => {};
    }
  }, [dispatch, id, token]);
  const isLoading = useSelector((state) => state.batchDetail.isLoading);
  const batchDetail = useSelector((state) => state.batchDetail);
  let content = (
    <>
      <section className="text-lg mx-10 font-poppins ">
        <div className="text-center flex bg-colorSecondaryBorder items-center rounded-t-xl py-2">
          <div className="font-bold font-poppins text-lg grow">
            Partiýa barada maglumat
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
              <div className="grid grid-cols-10">
                <div className="grid col-span-3 font-bold">
                  {BatchContext.arrived_at}:
                </div>
                <div className="grid col-span-7">{batchDetail.arrived_at}</div>
              </div>
              <div className="grid grid-cols-10">
                <div className="grid col-span-3 font-bold">
                  {BatchContext.title}:
                </div>
                <div className="grid col-span-7">{batchDetail.title}</div>
              </div>
              <div className="grid grid-cols-10">
                <div className="grid col-span-3 font-bold">
                  {BatchContext.description}:
                </div>
                <div className="grid col-span-7">{batchDetail.description}</div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
  return content;
};

export default BatchView;
