import React from "react";
import { useSelector } from "react-redux";
import ContainerAttributeValue from "./ContainerAttributeValue";
import isStockManager from "../../../../../utils/isStockManager";
import ContainerAttributeValueEdit from "./ContainerAttributeValueEdit";
import ContainerAttributeValueDelete from "./ContainerAttributeValueDelete";
const ContainerAttribute = () => {
  const groups = useSelector((state) => state.login.groups);
  const attributes = useSelector(
    (state) => state.containerDetail.info.attributes
  );

  return (
    <>
      <section className="border bg-white hover:shadow m-4 rounded-lg border-gray-200">
        <div className=" px-14 pt-10 text-xl font-bold text-colorTextDarkBlue">
          TIR barada goşmaça maglumat:
        </div>

        <div className=" text-xl px-14 p-5">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {attributes?.map((attr, key) => (
              <div key={key} className="items-center pb-4 grid grid-cols-6">
                <div className="font-bold col-span-2">{attr.name}:</div>
                <p className="col-span-2">{attr.value}</p>
                {isStockManager(groups) ? (
                  <div className="flex">
                    <ContainerAttributeValueEdit id={attr.id} attr_id={attr.attr_id} value={attr.value} />
                    <ContainerAttributeValueDelete attr_id={attr.id} />
                    
                  </div>
                  
                  ) : (
                  ""
                )}
              </div>
            ))}

            {isStockManager(groups) ? 
            <>
            <ContainerAttributeValue />
            
            </>
             : ""}
          </div>
        </div>
      </section>
    </>
  );
};

export default ContainerAttribute;
