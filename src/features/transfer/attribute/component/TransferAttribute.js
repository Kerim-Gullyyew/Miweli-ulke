import React from "react";
import { useSelector } from "react-redux";
import { Attributes } from "../../TransferContext";
import isStockManager from "../../../../utils/isStockManager";
import TransferAttributeValue from "../../component/TransferAttributeValue";
import TransferAttributeValueEdit from "./TransferAttributeValueEdit";
import TransferAttributeValueDelete from "./TransferAttributeValueDelete";
import Loader from "../../../../utils/Loader";
const TransferAttribute = () => {
  const groups = useSelector((state) => state.login.groups);

  const transferDetail = useSelector((state) => state.transferDetail);
  const isLoading = useSelector((state) => state.transferDetail.isLoading);

  return (
    <section className=" mx-10 border m-4 border-gray-200 bg-white rounded-lg p-3 hover:shadow">
      <div className=" text-center py-4 text-xl font-bold text-colorTextDarkBlue">
        {Attributes.attributes}
      </div>

      <div className=" text-xl p-5">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {transferDetail?.data.attributes?.map((attr, key) => (
                <div key={key} className="items-center pb-4 grid grid-cols-5">
                  <div className="font-bold col-span-3">{attr.name}:</div>
                  <p className=" col-span-1">{attr.value}</p>

                  {isStockManager(groups) ? (
                    <>
                      <div className="flex">
                        <TransferAttributeValueEdit
                          id={attr.id}
                          attr_id={attr.attr_id}
                          value={attr.value}
                        />
                        <TransferAttributeValueDelete id={attr.id} />
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              ))}

              {isStockManager(groups) ? <TransferAttributeValue /> : ""}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default TransferAttribute;
