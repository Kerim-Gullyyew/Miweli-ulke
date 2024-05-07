import React, { useEffect, useState } from "react";
import isOdd from "../../../../utils/isOdd";
import { useParams } from "react-router-dom";
import { getBatchDetail } from "../../batch/batchDetailSlice";
import { ContainerDetailContext } from "../../BatchContext";
import BatchContainerNew from "./BatchContainerNew";
import { nameHelperHelper } from "../../../featuresSlice";
import { getContainerDetail } from "../containerDetailSlice";
import { useDispatch, useSelector } from "react-redux";
import isStockManager from "../../../../utils/isStockManager";
import BatchContainerDelete from "./BatchContainerDelete";
import BatchContainerEditWithModal from "./BatchContainerEditWithModal";
import Loader from "../../../../utils/Loader";

const BatchContainer = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { token } = useSelector((state) => state.login);
  const [error, SetError] = useState("");
  const groups = useSelector((state) => state.login.groups);

  // useEffect(() => {
  //   if (id !== undefined) {
  //     dispatch(getBatchDetail({ id: id, token }))
  //       .unwrap()
  //       .catch((err) => SetError(err));
  //     return () => {};
  //   }
  // }, [dispatch, id, token]);
  const batchDetail = useSelector((state) => state.batchDetail);
  const isLoading = useSelector((state) => state.batchDetail.isLoading);

  return (
    <section className=" bg-white p-3 hover:shadow rounded-lg">
      <div className=" text-center py-2 text-xl font-bold text-colorTextDarkBlue">
        {error.detail}
      </div>
      <div className=" text-center py-2 text-xl font-bold text-colorTextDarkBlue">
        TIR
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
                          {ContainerDetailContext.title}
                        </th>
                        <th scope="col" className="p-2">
                          {ContainerDetailContext.id_number}
                        </th>
                        <th scope="col" className="p-2">
                          {ContainerDetailContext.type_code}
                        </th>
                        <th scope="col" className="p-2">
                          {ContainerDetailContext.pallet_count}
                        </th>
                        <th scope="col" className="p-2">
                          {ContainerDetailContext.created_at}
                        </th>
                        <th scope="col" className="p-2">
                          {ContainerDetailContext.updated_at}
                        </th>

                        <th scope="col" className="p-2">
                          {ContainerDetailContext.action}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <>
                        {batchDetail?.containers?.map((cont, key) => (
                          <tr
                            key={key}
                            onClick={() => {
                              dispatch(nameHelperHelper("view"));
                              dispatch(getContainerDetail(cont));
                            }}
                            className={
                              isOdd(key)
                                ? " bg-white hover:bg-blue-200 cursor-pointer"
                                : " bg-colorIconGray hover:bg-blue-200 cursor-pointer"
                            }
                          >
                            <td className="whitespace-nowrap p-2 font-medium">
                              {cont?.info?.title}
                            </td>
                            <td className="whitespace-nowrap p-2 font-medium">
                              {cont?.info?.id_number}
                            </td>
                            <td className="whitespace-nowrap p-2 font-medium">
                              {cont?.info?.type_code}
                            </td>

                            <td className="whitespace-nowrap p-2 font-medium">
                              {cont?.info?.pallet_count}
                            </td>
                            <td className="whitespace-nowrap p-2 font-medium">
                              {cont?.info?.created_at}
                            </td>
                            <td className="whitespace-nowrap p-2 font-medium">
                              {cont?.info?.updated_at}
                            </td>
                            <td className=" items-center whitespace-nowrap font-medium">
                              <div className="space-x-3 pr-3 flex">
                                {isStockManager(groups) ? (
                                  <>
                                    <BatchContainerEditWithModal
                                      id1={cont.info.id}
                                      title1={cont.info.title}
                                      id_number1={cont.info.id_number}
                                      type_code1={cont.info.type_code}
                                      pallet_count1={cont.info.pallet_count}
                                    />
                                    <BatchContainerDelete
                                      id={cont?.id}
                                      title={cont?.info?.title}
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
                    </tbody>
                  </table>
                )}
                {isStockManager(groups) ? <BatchContainerNew /> : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BatchContainer;
