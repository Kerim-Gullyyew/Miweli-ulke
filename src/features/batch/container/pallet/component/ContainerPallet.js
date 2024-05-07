import React, { useEffect } from "react";
import isOdd from "../../../../../utils/isOdd";
import { backendUrl } from "../../../../../data/ConstTexts";

import { useDispatch, useSelector } from "react-redux";
import { ContainerPalletContext } from "../../../BatchContext";
import ContainerPalletNew from "./ContainerPalletNew";
import { Select, initTE } from "tw-elements";
import { nameHelperPallet } from "../../../../featuresSlice";
import { getContainerPalletDetail } from "../containerPalletSlice";
import ContainerPalletDelete from "./ContainerPalletDelete";
import isStockManager from "../../../../../utils/isStockManager";
import ContainerPalletCopy from "./ContainerPalletCopy";
const ContainerPallet = () => {
  useEffect(() => {
    initTE({ Select });
  }, []);
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.login.groups);

  const pallets = useSelector((state) => state.containerDetail.info.pallets);


  return (
    <section className=" bg-white p-3 hover:shadow rounded-lg">
      <div className=" text-center py-2 text-xl font-bold text-colorTextDarkBlue">
      TIR Paletler
      </div>
     
      <div className="w-full px-10">
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="inline-block overflow-x-auto min-w-full py-2">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="font-medium">
                    <tr className="bg-blue-50 text-black">

                    <th scope="col" className=" p-2">
                        {ContainerPalletContext.code}
                      </th>
                      <th scope="col" className=" p-2">
                        {ContainerPalletContext.title}
                      </th>
                      <th scope="col" className=" p-2">
                        {ContainerPalletContext.product_title}
                      </th>
                      <th scope="col" className=" p-2">
                        {ContainerPalletContext.image}
                      </th>
                      <th scope="col" className=" p-2">
                        {ContainerPalletContext.action}
                      </th>
                     
                    </tr>
                  </thead>
                  <tbody>
                    {pallets.map((pal, key) => 
                      
                    (
                      <tr
                      title={pal.attributes.map((attr) => attr.name + ": " + attr.value)}
                        key={key}
                        onClick={() => {dispatch(nameHelperPallet("view"));
                        dispatch(getContainerPalletDetail(pal))
                      }
                      
                      }
                        className={
                          isOdd(key) ? " bg-white hover:bg-blue-200 cursor-pointer" : " bg-colorIconGray hover:bg-blue-200 cursor-pointer"
                        }
                      >
                        
                        <td className="whitespace-nowrap p-2 font-medium">
                          {pal?.code}
                        </td>
                        <td className="whitespace-nowrap p-2 font-medium">
                          {pal?.title}
                        </td>
                        <td className="whitespace-nowrap p-2 font-medium">
                          {pal?.product?.title}
                        </td>

                        <td className="whitespace-nowrap p-2 font-medium">
                          <img className=" w-10 h-10 object-contain" src={backendUrl + pal?.product?.image} alt="product" />
                        </td>
                       
                       
                        <td className=" items-center whitespace-nowrap font-medium">
                          <div className="space-x-3 pr-3 flex">
                            
                          {isStockManager(groups) ? (
                            <>
                            <ContainerPalletDelete id={pal?.id} title={pal.title} />
                            </>

                          ):("")}

                          </div>
                          
                        </td>
                      </tr>
                    ))}
                    
                    {/* {isStockManager(groups) ? (
                      <BatchContainerValue />
                    ):("")}
                    <BatchContainerNew /> */}
                  </tbody>
                </table>
                <div className="flex items-center">
                  <ContainerPalletNew />
                  {pallets.length > 0 && (
                    <ContainerPalletCopy pallet={pallets[pallets.length - 1]} />
                  )}

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContainerPallet;
