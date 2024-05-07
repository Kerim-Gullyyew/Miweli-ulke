import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBatchDetail } from "../../batch/batchDetailSlice";
import BatchAttributeValue from "../../batch/component/BatchAttributeValue";
import { FaPen, FaPlus, FaSave } from "react-icons/fa";
import {Attributes} from "../../BatchContext";
import isStockManager from "../../../../utils/isStockManager";
import BatchAttributeValueEdit from "./BatchAttributeValueEdit";
import BatchAttributeValueDelete from "./BatchAttributeValueDelete";
import Loader from "../../../../utils/Loader";
const BatchAttribute = () => {
  const groups = useSelector((state) => state.login.groups);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { token } = useSelector((state) => state.login);
  const [error, SetError] = useState("");

  // useEffect(() => {
  //   if (id !== undefined) {
  //     let isCancelled = false;
  //     dispatch(getBatchDetail({ id: id, token }))
  //       .unwrap()
  //       .catch((err) => SetError(err));
  //     return () => {
  //       isCancelled = true;
  //     };
  //   }
  // }, [dispatch, id, token]);
  const batchDetail = useSelector((state) => state.batchDetail);
  const isLoading = useSelector((state) => state.batchDetail.isLoading);
  return (
    <section className=" mx-10 border m-4 border-gray-200 bg-white rounded-lg p-3 hover:shadow">
      <div className=" text-center py-4 text-xl font-bold text-colorTextDarkBlue">
        {/* {BatchContext.attribute} */}
        
        {Attributes.attributes}
      </div>

      <div className=" text-xl p-5">
        <div className="grid grid-cols-1 md:grid-cols-2">

          {isLoading ? (
            <Loader />
          ): (
            <>
          {batchDetail?.attribute?.map((batch, key) => (
            <div key={key} className="items-center pb-4 grid grid-cols-5">
              <div className="font-bold col-span-3">{batch.name}:</div>
              <p className=" col-span-1">{batch.value}</p>

              {isStockManager(groups) ? (
                <>
                <div className="flex">
                <BatchAttributeValueEdit id={batch.id} attr_id={batch.attr_id} value={batch.value} />
                <BatchAttributeValueDelete attr_id={batch.id} />

                </div>
                </>
                // <FaPen
                //   size={20}
                //   className="text-blue-800 col-span-1 cursor-pointer"
                // />
              ) : (
                ""
              )}
            </div>
          ))}

          {isStockManager(groups) ? <BatchAttributeValue /> : ""}
            
            </>
          )}


        </div>
      </div>
    </section>
  );
};

export default BatchAttribute;
