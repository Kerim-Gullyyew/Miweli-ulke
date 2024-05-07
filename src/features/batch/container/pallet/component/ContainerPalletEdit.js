import React, { useEffect, useState, Fragment } from "react";
import { IoMdReturnLeft } from "react-icons/io";
import { TfiSave } from "react-icons/tfi";
import { Transition, Combobox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  nameHelperPallet,
  stockView,
} from "../../../../featuresSlice";
import {
  getBatchDetail,
} from "../../../batch/batchDetailSlice";
import {
  ContainerPalletContext,
} from "../../../BatchContext";
import {
  getContainerDetail,
} from "../../containerDetailSlice";
import { backendUrl } from "../../../../../data/ConstTexts";
import {
  editContainerPallet,
  getContainerPalletDetail,
} from "../containerPalletSlice";
import { getCamera } from "../../../../stock/cameraSlice";
import {
  editCellTransfer,
} from "../../../../transfer/transferSlice";
const ContainerPalletEdit = () => {
  const dispatch = useDispatch();

  const containerPallet = useSelector((state) => state?.containerPallet);
  const [error, SetError] = useState("");
  const { token } = useSelector((state) => state.login);

  const [selected, setSelected] = useState(containerPallet?.product);
  const [query, setQuery] = useState("");

  const [title, setTitle] = useState(containerPallet?.title);
  const [code, setCode] = useState(containerPallet?.code);
  const [description, setDescription] = useState(containerPallet?.description);
  const [id, setId] = useState(containerPallet?.id);
  const camera = useSelector((state) => state?.camera);
  const [cell, setCell] = useState(containerPallet?.cell);
  const [price, setPrice] = useState(containerPallet?.transfer_price);
  const views = useSelector((state) => state?.views);
  const SimpleProductList = useSelector(
    (state) => state?.product?.simpleProduct
  );
  const container_id = useSelector((state) => state?.containerDetail?.info?.id);
  const pallet_id = useSelector((state) => state?.containerPallet?.id);
  const batch_id = useSelector((state) => state?.batchDetail?.id);
  const containerDetail = useSelector((state) => state?.containerDetail);
  const batchDetail = useSelector((state) => state?.batchDetail);
  useEffect(() => {
    const cont_id = containerDetail?.info?.id;
    let key = 0;

    batchDetail.containers.map((cont) => {
      if (cont.info.id === cont_id) {
        dispatch(getContainerDetail(cont));
        containerDetail.info.pallets.map((pal) => {
          if (pal.id === pallet_id) {
            dispatch(getContainerPalletDetail(pal));
          }
        });
      }
      key = key + 1;
    });
  }, [
    dispatch,
    batchDetail.containers,
    containerDetail.info?.id,
    containerDetail.info.pallets,
    pallet_id,
  ]);
  const transfer_id = useSelector(
    (state) => state?.batchDetail?.transfer_id?.id
  );
  const pallet_transfer_id = useSelector(
    (state) => state?.containerPallet?.transfer_id
  );
  const stock = useSelector((state) => state?.stock);
  const filteredProduct =
    query === ""
      ? SimpleProductList
      : SimpleProductList?.filter((product) =>
          product?.title
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query?.toLowerCase().replace(/\s+/g, ""))
        );

  const onContainerPalletEditClicked = (e) => {
    e.preventDefault();

    const json = {
      code: code,
      title: title,
      description: description,
      container_id: container_id,
      product_id: selected.id,
    };
    let isCancelled = false;
    dispatch(editContainerPallet({ id, token, json }))
      .unwrap()
      .then((res) => {
        const pallet_id = res?.data?.id;
        const jsontrans = {
          price: price,
          pallet_id: pallet_id,
          transfer_id: transfer_id,
          cell_id: cell.id,
        };
        dispatch(
          editCellTransfer({ token, id: pallet_transfer_id, json: jsontrans })
        )
          .unwrap()
          .then((res) => {
            dispatch(getBatchDetail({ id: batch_id, token }))
              .unwrap()
              .then((res) => {
                dispatch(nameHelperPallet("view"));
                dispatch(stockView(""));
              })
              .catch((err) => SetError(err));
          });

      })
      .catch((err) => SetError(err));
    return () => {
      isCancelled = true;
    };
  };
  return (
    <>
      <section className="text-lg bg-white hover:shadow mt-10 border m-4 py-4 rounded-lg font-poppins px-10">
        <div className="text-center overflow-auto flex items-center py-2">
          <div className="font-bold font-poppins text-colorTextDarkBlue text-xl grow">
            Paledi üýtgetmek
          </div>
          <div className="flex">
            <div
              onClick={() => {
                dispatch(nameHelperPallet("view"));
              }}
              className="mr-10 flex items-center justify-between cursor-pointer text-lg font-bold font-poppins text-center rounded-lg"
            >
              <IoMdReturnLeft className="font-bold text-red-700" size={30} />
            </div>
          </div>
        </div>

        <div className="text-center font-poppins font-bold text-red-600">
          {error.detail}
        </div>
        <div className=" px-5 space-y-3 pt-3">
          <div className="flex-wrap md:grid md:grid-cols-2">
            <div className="grid grid-cols-3 space-y-3 items-center">
              <div className="grid grid-cols-1 whitespace-nowrap font-bold">
                {ContainerPalletContext?.title}:
              </div>

              <div className="grid grid-cols-2 px-3 whitespace-nowrap">
                <div className="w-36 mx-3 flex items-center border-b border-blue-500 py-2">
                  <input
                    type="text"
                    className="w-full appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 space-y-3 items-center">
              <div className=" grid-cols-1 whitespace-nowrap font-bold">
                {ContainerPalletContext.code}:
              </div>
              <div className=" grid-cols-2 px-3 whitespace-nowrap">
                <div className="w-36 mx-3 flex items-center border-b border-blue-500 py-2">
                  <input
                    type="text"
                    className="w-full appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex-wrap md:grid md:grid-cols-2">
            <div className="grid grid-cols-3 space-y-3 items-center">
              <div className=" grid-cols-1 whitespace-nowrap font-bold">
                {ContainerPalletContext.description}:
              </div>
              <div className=" grid-cols-2 px-3 whitespace-nowrap">
                <div className="w-36 mx-3 flex items-center border-b border-blue-500 py-2">
                  <input
                    type="text"
                    className="w-full appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 space-y-3 items-center">
              <div className="grid grid-cols-1 whitespace-nowrap font-bold">
                {ContainerPalletContext.product}:
              </div>
              <div className="grid grid-cols-2 px-3 whitespace-nowrap">
                <div className=" w-48 flex items-center py-2">
                  <Combobox value={selected} onChange={setSelected}>
                    <div className="relative mt-1">
                      <div className="relative max-w-7xl cursor-default overflow-hidden rounded-lg bg-white text-left border-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-400 sm:text-sm">
                        <Combobox.Input
                          className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-colorTextDarkBlue focus:ring-0"
                          displayValue={(product) => product?.title}
                          onChange={(event) => setQuery(event.target.value)}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronUpDownIcon
                            className="h-5 w-5 text-colorTextDarkBlue"
                            aria-hidden="true"
                          />
                        </Combobox.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery("")}
                      >
                        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {filteredProduct?.length === 0 && query !== "" ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-colorTextDarkBlue">
                              Hiç zat tapylmady
                            </div>
                          ) : (
                            filteredProduct.map((product) => (
                              <Combobox.Option
                                key={product.id}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-2 pr-4 ${
                                    active
                                      ? "bg-blue-500 text-white"
                                      : "text-colorTextDarkBlue"
                                  }`
                                }
                                value={product}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      <div className="flex items-center justify-between">
                                        {product?.title}
                                        <img
                                          className="w-10 h-10 object-contain"
                                          src={backendUrl + product?.image}
                                          alt="img"
                                        />
                                      </div>
                                    </span>
                                    {selected ? (
                                      <span
                                        className={`absolute inset-y-0 left-0 font-bold flex items-center pl-3 ${
                                          active
                                            ? "text-white"
                                            : "text-blue-600"
                                        }`}
                                      >
                                        <CheckIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Combobox.Option>
                            ))
                          )}
                        </Combobox.Options>
                      </Transition>
                    </div>
                  </Combobox>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-wrap md:grid md:grid-cols-2">
            <div className="grid grid-cols-3 space-y-3 items-center">
              <div className="grid grid-cols-1 whitespace-nowrap font-bold">
                {ContainerPalletContext.price}:
              </div>

              <div className="grid grid-cols-2 px-3 whitespace-nowrap">
                <div className="w-36 mx-3 flex items-center border-b border-blue-500 py-2">
                  <input
                    type="text"
                    className="w-full appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 space-y-3 items-center">
              <div className=" grid-cols-1 whitespace-nowrap font-bold">
                {ContainerPalletContext.cell}:
              </div>
              <div className=" grid-cols-2 px-3 whitespace-nowrap">
                <div className="w-36 mx-3 flex items-center border-b border-blue-500 py-2">
                  {cell?.code}
                </div>
              </div>
            </div>
          </div>

          <div>
            {views?.stockView === "" && (
              <div>
                <div className="flex flex-wrap justify-center">
                  {stock.data.map((stock, key) => (
                    <div
                      key={key}
                      onClick={({ id = stock?.id }) => {
                        dispatch(getCamera({ id, token }))
                          .unwrap()
                          .then(() => dispatch(stockView("cell")))
                          .catch((err) => SetError(err));
                      }}
                      title={stock?.description}
                      className=" w-[150px] h-[180px] border hover:shadow-lg rounded-lg justify-between flex cursor-pointer flex-col m-2"
                    >
                      <div className="text-center text-lg">
                        <p className="text-black font-poppins font-bold">
                          №{stock?.code}
                        </p>
                        <p className="text-black">{stock?.title}</p>
                        <p className="text-black">Jemi: {stock?.total_cells}</p>
                        <p className="text-black">Bosy: {stock?.empty_cells}</p>
                      </div>
                      <p className="text-black font-bold text-right pr-2">{((stock.total_cells - stock.empty_cells)*100/stock.total_cells).toFixed(1)}%</p>
                      <div className="flex bg-white border-2 border-colorSecondaryBorder mb-1">
                      <div style={{width: (stock.total_cells - stock.empty_cells)*100/stock.total_cells + '%'}} className="bg-colorGreen  flex bottom-0 h-3 rounded-r"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {views?.stockView === "cell" && (
              <div>
                <div
                  onClick={() => {
                    dispatch(stockView(""));
                  }}
                  className="mr-10 flex items-center justify-end px-3 cursor-pointer text-lg font-bold font-poppins text-center rounded-lg"
                >
                  <IoMdReturnLeft
                    className="font-bold text-red-700"
                    size={30}
                  />
                </div>
                <div className="overflow-auto p-3 pb-10 bg-colorBgContainer">
                  <div className="flex">
                    {camera?.data?.rows?.map((row, key) => (
                      <div key={key} className="flex w-full pr-14">
                        {row?.columns?.map((col, key) => (
                          <div key={key} className="flex">
                            <div className=" mx-auto">
                              {col.cells.map((cell, key) => (
                                <Fragment key={key}>
                                  {/* {cell?.product === null ? ( */}
                                    <div
                                      onClick={() => !cell.is_full ? setCell(cell) : setCell("")}
                                      className={
                                        "group cursor-pointer relative rounded-full w-10 h-10 " +
                                        (cell.is_full === false
                                          ? "bg-white"
                                          : "bg-green-600")
                                      }
                                    >
                                      <span className="absolute z-10 top-10 flex w-[100px] text-center scale-0 transition-all justify-center items-center rounded border bg-white p-1 text-xs text-black group-hover:scale-100">
                                        {cell?.code}
                                      </span>
                                    </div>
                                 
                                </Fragment>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>

                  <div className=" grid grid-cols-3"></div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end px-5">
            <TfiSave
              size={20}
              type="submit"
              onClick={onContainerPalletEditClicked}
              className="text-blue-600 cursor-pointer"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default ContainerPalletEdit;
