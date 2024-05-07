import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ImCross } from "react-icons/im";
import { TransferContext } from "../TransferContext";
import { getTransferDetail } from "../transferDetailSlice";
import Loader from "../../../utils/Loader";
const TransferView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { token } = useSelector((state) => state.login);
  const [error, SetError] = useState("");
  const navigate = useNavigate();
  // useEffect(() => {
  //   let isCancelled = false;
  //   dispatch(getTransferDetail({ id, token }))
  //     .unwrap()
  //     .catch((err) => SetError(err));
  //   return () => {
  //     isCancelled = true;
  //   };
  // }, [dispatch, id, token]);
  const transferDetail = useSelector((state) => state.transferDetail.data);
  const isLoading = useSelector((state) => state.transferDetail.isLoading);
  let content = (
    <>
      <section className="text-lg mx-10 font-poppins ">
        <div className="text-center flex bg-colorSecondaryBorder items-center rounded-t-xl py-2">
          <div className="font-bold font-poppins text-lg grow">
            Transfer barada maglumat
          </div>

          <div className="flex items-center">
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
                  {TransferContext.title}:
                </div>
                <div className="grid col-span-7">
                  {transferDetail.transition_type}
                </div>
              </div>
              <div className="grid grid-cols-10">
                <div className="grid col-span-3 font-bold">
                  {TransferContext.created_at}:
                </div>
                <div className="grid col-span-7">
                  {transferDetail?.created_at}
                </div>
              </div>
              <div className="grid grid-cols-10">
                <div className="grid col-span-3 font-bold">
                  {TransferContext.updated_at}:
                </div>
                <div className="grid col-span-7">
                  {transferDetail?.updated_at}
                </div>
              </div>
              <div className="grid grid-cols-10">
                <div className="grid col-span-3 font-bold">
                  {TransferContext?.creater}:
                </div>
                <div className="grid col-span-7">
                  {transferDetail?.user?.username}
                </div>
              </div>
              <div className="grid grid-cols-10">
                <div className="grid col-span-3 font-bold">
                  {TransferContext?.email}:
                </div>
                <div className="grid col-span-7">
                  {transferDetail?.user?.email}
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

export default TransferView;
