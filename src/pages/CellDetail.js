import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { backendUrl } from "../data/ConstTexts";
import { getcell } from "../features/stock/cellSlice";
import { cellContext } from "../features/stock/stockContext";
import Loader from "../utils/Loader";

const CellDetail = () => {
  const { token } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    let isCancelled = false;
    dispatch(getcell({ id, token }))
      .unwrap()
      .catch((err) => SetError(err));
    return () => {
      isCancelled = true;
    };
  }, [dispatch, id, token]);
  const [error, SetError] = useState("");
  const navigate = useNavigate();
  const cellDetail = useSelector((state) => state.cell.data);
  const isLoading = useSelector((state) => state.cell.isLoading);
  let content = (
    <>
      <section className="text-lg mx-10 font-poppins ">
        <div className="text-center flex bg-colorSecondaryBorder items-center rounded-t-xl py-2">
          <div className="font-bold font-poppins text-lg grow">
            Öýjük barada maglumat
          </div>

          <div className="flex items-center">
            <div className="pr-5 text-red-600 cursor-pointer">
              <ImCross
                className="cursor-pointer"
                onClick={() => navigate(-1)}
                size={20}
              />
            </div>
          </div>
        </div>
        <hr className="border border-colorBorder" />

        <div className="text-center font-poppins font-bold text-red-600">
          {error}
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className=" px-5 space-y-3 pt-3 bg-white rounded-lg p-3 hover:shadow">
            <div className="grid grid-cols-10">
              <div className="grid col-span-3 font-bold">
                {cellContext.code}:
              </div>
              <div className="grid col-span-7">{cellDetail?.code}</div>
            </div>
            <div className="grid grid-cols-10">
              <div className="grid col-span-3 font-bold">
                {cellContext.pallet}:
              </div>
              <div className="grid col-span-7">
                {cellDetail?.pallet
                  ? cellDetail?.pallet?.title
                  : cellContext.empty}
              </div>
            </div>
            <div className="grid grid-cols-10">
              <div className="grid col-span-3 font-bold">
                {cellContext.product}:
              </div>
              <div className="grid col-span-7">
                {cellDetail?.product
                  ? cellDetail?.product?.title
                  : cellContext.empty}
              </div>
            </div>
            <div className="grid grid-cols-10 items-center">
              <div className="grid col-span-3 font-bold">
                {cellContext.image}:
              </div>
              <div className="grid col-span-7 ">
                {cellDetail?.product ? (
                  <img
                    className="w-20 h-20 object-contain"
                    src={backendUrl + cellDetail.product.image}
                    alt="img"
                  />
                ) : (
                  cellContext.empty
                )}
              </div>
            </div>

            <div className="grid grid-cols-10 items-center">
              <div className="grid col-span-3 font-bold">
                {cellContext.palletcode}:
              </div>
              <div className="grid col-span-7 ">
                {cellDetail?.pallet
                  ? cellDetail?.pallet?.code
                  : cellContext.empty}
              </div>
            </div>

            <div className="grid grid-cols-10 items-center">
              <div className="grid col-span-3 font-bold">
                {cellContext.pallettitle}:
              </div>
              <div className="grid col-span-7 ">
                {cellDetail?.pallet
                  ? cellDetail?.pallet?.title
                  : cellContext.empty}
              </div>
            </div>
            {cellDetail?.pallet?.attributes?.map((attr) => {
              return (
                <div className="grid grid-cols-10 items-center">
                  <div className="grid col-span-3 font-bold">
                    {cellContext.palletattribute}:
                  </div>
                  <div className="grid col-span-7 ">
                    {attr.name + " : " + attr.value}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
  return content;
};

export default CellDetail;
