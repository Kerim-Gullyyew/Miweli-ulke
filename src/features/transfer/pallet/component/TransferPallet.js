import React from "react";
import isOdd from "../../../../utils/isOdd";
import { useSelector } from "react-redux";
import isStockManager from "../../../../utils/isStockManager";
import TransferPalletNew from "./TransferPalletNew";
import { backendUrl } from "../../../../data/ConstTexts";
import TransferPalletEditWithModal from "./TransferPalletEditWithModal";
import TransferPalletDelete from "./TransferPalletDelete";
import Loader from "../../../../utils/Loader";

const TransferPallet = () => {
  const groups = useSelector((state) => state.login.groups);
  const isLoading = useSelector((state) => state.transferDetail.isLoading);
  const pallet_transfers = useSelector(
    (state) => state.transferDetail.data.pallet_transfers
  );

  return (
    <section className=" bg-white p-3 hover:shadow rounded-lg">
      <div className=" text-center py-2 text-xl font-bold text-colorTextDarkBlue">
        Palet
      </div>

      <div className="w-full px-10">
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="inline-block overflow-x-auto min-w-full py-2">
              <div className="overflow-hidden">
                {isLoading ? (
                  <Loader />
                ) : (
                  <table className="min-w-full text-left text-sm font-light">
                    <thead className="font-medium">
                      <tr className="bg-blue-50 text-black">
                        <th scope="col" className=" p-2">
                          Bahasy
                        </th>
                        <th scope="col" className="p-2">
                          Ady
                        </th>
                        <th scope="col" className="p-2">
                          TIR Ady
                        </th>
                        <th scope="col" className="p-2">
                          Haryt Ady
                        </th>
                        <th scope="col" className="p-2">
                          Surat
                        </th>
                        <th scope="col" className="p-2">
                          Öýjük
                        </th>

                        <th scope="col" className="p-2">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <>
                        {pallet_transfers?.map((pal, key) => (
                          <tr
                            key={key}
                            onClick={() => {
                              // dispatch(nameHelperHelper("view"));
                              // dispatch(getContainerDetail(cont));
                            }}
                            className={
                              isOdd(key)
                                ? " bg-white hover:bg-blue-200 cursor-pointer"
                                : " bg-colorIconGray hover:bg-blue-200 cursor-pointer"
                            }
                          >
                            <td className="whitespace-nowrap p-2 font-medium">
                              {pal.price}
                            </td>
                            <td className="whitespace-nowrap p-2 font-medium">
                              {pal.pallet.title}
                            </td>
                            <td className="whitespace-nowrap p-2 font-medium">
                              {pal?.pallet?.container?.title}
                            </td>
                            <td className="whitespace-nowrap p-2 font-medium">
                              {pal?.pallet?.product?.title}
                            </td>

                            <td className="whitespace-nowrap p-2 font-medium">
                              <img
                                src={backendUrl + pal?.pallet?.product?.image}
                                className="w-10 h-10 object-contain"
                                alt="img"
                              />
                            </td>

                            <td className="whitespace-nowrap p-2 font-medium">
                              {pal.cell.code}
                            </td>
                            <td className=" items-center whitespace-nowrap font-medium">
                              <div className="space-x-3 pr-3 flex">
                                {isStockManager(groups) ? (
                                  <>
                                    <TransferPalletEditWithModal
                                      id1={pal.id}
                                      pallet_id1={pal.pallet.id}
                                      cellid1={pal.cell.id}
                                      price1={pal.price}
                                      cellcode1={pal.cell.code}
                                    />
                                    <TransferPalletDelete
                                      id={pal?.id}
                                      title={pal?.pallet?.title}
                                    />
                                  </>
                                ) : (
                                  ""
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </>

                      {/* <BatchContainerNew /> */}
                    </tbody>
                  </table>
                )}
                {isStockManager(groups) ? <TransferPalletNew /> : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransferPallet;
