import React from "react";
import { useSelector } from "react-redux";
import isStockManager from "../../../../../utils/isStockManager";
import PalletAttributeValue from "./PalletAttributeValue";
import PalletAttributeValueEdit from "./PalletAttributeValueEdit";
import PalletAttributeValueDelete from "./PalletAttributeValueDelete";
const PalletAttribute = () => {
  const groups = useSelector((state) => state.login.groups);
  const attributes = useSelector(
    (state) => state.containerPallet.attributes
  );

  return (
    <>
      <section className="border bg-white hover:shadow m-4 rounded-lg border-gray-200">
        <div className=" px-14 pt-10 text-xl font-bold text-colorTextDarkBlue">
        Palet barada goşmaça maglumat:
        </div>

        <div className=" text-xl px-14 p-5">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {attributes?.map((attr, key) => (
              <div key={key} className="items-center pb-4 grid grid-cols-6">
                <div className="font-bold col-span-2">{attr.name}:</div>
                <p className="col-span-2">{attr.value}</p>
                {isStockManager(groups) ? (
                  <div className="flex">
                    <PalletAttributeValueEdit id={attr.id} attr_id={attr.attr_id} value={attr.value} />
                    
                    
                    <PalletAttributeValueDelete attr_id={attr.id} />
                    
                  </div>
                  
                  ) : (
                  ""
                )}
              </div>
            ))}

            {isStockManager(groups) ? 
            <>
            <PalletAttributeValue />
            
            </>
             : ""}
          </div>
        </div>
      </section>
    </>
  );
};

export default PalletAttribute;
