import React, { useEffect, useState, Fragment, useRef } from "react";
import { TfiSave } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Transition, Combobox } from "@headlessui/react";
import { FaPlus } from "react-icons/fa";

import { getCamera } from "../../stock/cameraSlice";
import { ImCross } from "react-icons/im";
import { IoMdReturnLeft } from "react-icons/io";
import { stockView, other } from "../../featuresSlice";
import { ReduceContext } from "../ReduceContext";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { createreducedetail } from "../reduceDetailSlice";
import { getreduce } from "../reduceSlice";
import { getStock } from "../../stock/stockSlice";

const ReduceNew = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [error, SetError] = useState("");
  const { token } = useSelector((state) => state.login);
  const [selectedCell, setselectedCell] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [selected, setSelected] = useState("");
  const [query, setQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const user = useSelector((state) => state.login.user_id);
  const views = useSelector((state) => state.views);
  const camera = useSelector((state) => state.camera);
  useEffect(() => {
    dispatch(getStock({ token })).unwrap().then(() => {
      dispatch(stockView(""));
      dispatch(other(""));
    })
  }, [dispatch, token]);

  useEffect(() => {
    if (!selectedImage) {
      setImage(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedImage);
    setImage(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);
  const stock = useSelector((state) => state.stock);
  const moveDetail = useSelector((state) => state.moveDetail);
  const onSelectImage = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedImage(undefined);
      return;
    }
    setSelectedImage(e.target.files[0]);
  };
  const filteredAttr =
    query === ""
      ? selectedCell?.pallet?.attributes
      : selectedCell?.pallet?.attributes?.filter((attr) =>
          attr.title
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  const onReduceCreateClicked = (e) => {
    e.preventDefault();

    const formData = new FormData();
    
    formData.append("price", price);
    formData.append("amount", amount);
    formData.append("reason", reason);
    formData.append("image", selectedImage === undefined ? "" : selectedImage);
    formData.append("description", description);
    formData.append("pallet_id", selectedCell.pallet.id);
    formData.append("pallet_attribute_id", selected.attr_id);
    formData.append("user", user);

    dispatch(createreducedetail({ token, formData }))
      .unwrap()
      .then((res) => {
        dispatch(getreduce({ token })).unwrap().then(() => {
          setOpen(false);
          SetError("");
          setPrice("");
          setAmount("");
          setQuery("");
          setReason("");
          setSelectedImage("");
          setDescription("");
          setselectedCell("");
          setSelected("");
        });
      
      })
      .catch((err) => SetError(err));
    return () => {};
  };
  return (
    <>
      <FaPlus
        onClick={() => setOpen(!open)}
        title="Attributy uytgetmek"
        size={20}
        className="text-yellow-600 cursor-pointer"
      />
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all max-w-7xl">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <div className="flex justify-between">
                          <Dialog.Title
                            as="h3"
                            className="text-base pb-3 font-semibold leading-6 text-gray-900"
                          >
                            Gosmak
                          </Dialog.Title>
                          <div className="text-red-600">
                            <ImCross
                              className=" cursor-pointer"
                              onClick={() => setOpen(false)}
                              size={20}
                            />
                          </div>
                        </div>

                        <div className="mt-2 grid grid-cols-1 space-y-3">
                          <span className="text-red-600 text-center">
                            {error?.detail}
                          </span>

                          <div>
                            <div className="text-center font-bold text-lg">
                              {selectedCell.code}
                            </div>

                            {views.stockView === "" && (
                              <div>
                                <div className="flex flex-wrap justify-center">
                                  {stock.data.map((stock, key) => (
                                    <div
                                      key={key}
                                      onClick={({ id = stock.id }) => {
                                        dispatch(getCamera({ id, token }))
                                          .unwrap()
                                          .then(() =>
                                            dispatch(stockView("cell"))
                                          )
                                          .catch((err) => SetError(err));
                                      }}
                                      title={stock.description}
                                      className=" w-[150px] h-[180px] hover:shadow-lg border rounded-lg justify-between flex cursor-pointer flex-col m-2"
                                    >
                                      <div className="text-center text-lg">
                                        <p className="text-black font-poppins font-bold">
                                          №{stock.code}
                                        </p>
                                        <p className="text-black">
                                          {stock.title}
                                        </p>
                                        <p className="text-black">
                                          Jemi: {stock.total_cells}
                                        </p>
                                        <p className="text-black">
                                          Bosy: {stock.empty_cells}
                                        </p>
                                      </div>
                                      <p className="text-black font-bold text-right pr-2">{((stock.total_cells - stock.empty_cells)*100/stock.total_cells).toFixed(1)}%</p>
                                      <div className="flex bg-white border-2 border-colorSecondaryBorder mb-1">
                                      <div style={{width: (stock.total_cells - stock.empty_cells)*100/stock.total_cells + '%'}} className="bg-colorGreen flex bottom-0 h-3 rounded-r"></div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {views.stockView === "cell" && (
                              <div>
                                <div
                                  onClick={() => {
                                    dispatch(stockView(""));
                                    setselectedCell("");
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
                                    {camera.data.rows.map((row, key) => (
                                      <div key={key} className="flex w-full pr-14">
                                        {row.columns.map((col, key) => (
                                          <div
                                            key={key}
                                            className="flex"
                                          >
                                            <div className="mx-auto">
                                              {col.cells.map((cell, key) => (
                                                <Fragment key={key}>
                                                  {/* {cell.product !== null ? ( */}
                                                    <div
                                                      onClick={() =>
                                                        cell.is_full ?
                                                        setselectedCell(cell) : setselectedCell("")
                                                      }
                                                      className={
                                                        "group cursor-pointer relative rounded-full w-10 h-10 " +
                                                        (cell.is_full === false
                                                          ? "bg-white"
                                                          : "bg-green-600")
                                                      }
                                                    >
                                                      <span className="absolute z-10 top-10 flex w-[100px] text-center scale-0 transition-all justify-center items-center rounded border bg-white p-1 text-xs text-black group-hover:scale-100">
                                                        {cell.code}
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
                                </div>
                              </div>
                            )}
                          </div>
                          <div>
                            Attribute
                          </div>
                          <div className=" mt-2 grid grid-cols-1 space-y-3">
                            <Combobox value={selected} onChange={setSelected}>
                              <div className="relative mt-1">
                                <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left border-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-400 sm:text-sm">
                                  <Combobox.Input
                                    className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-colorTextDarkBlue focus:ring-0"
                                    displayValue={(attr) => attr.name}
                                    onChange={(event) =>
                                      setQuery(event.target.value)
                                    }
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
                                    {filteredAttr?.length === 0 &&
                                    query !== "" ? (
                                      <div className="relative cursor-default select-none py-2 px-4 text-colorTextDarkBlue">
                                        Nothing found.
                                      </div>
                                    ) : (
                                      filteredAttr?.map((attr) => (
                                        <Combobox.Option
                                          key={attr.id}
                                          className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                              active
                                                ? "bg-blue-500 text-white"
                                                : "text-colorTextDarkBlue"
                                            }`
                                          }
                                          value={attr}
                                        >
                                          {({ selected, active }) => (
                                            <>
                                              <span
                                                className={`block truncate ${
                                                  selected
                                                    ? "font-medium"
                                                    : "font-normal"
                                                }`}
                                              >
                                                <div className="flex items-center justify-between">
                                                  {attr.name}
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

                          <div className="grid grid-cols-10 items-center">
                            <input
                              className="grid col-span-5"
                              type="file"
                              accept=".png, .jpg, .jpeg"
                              onChange={onSelectImage}
                              name="image"
                            />
                            <div className="grid col-span-5 w-32 items-center h-32">
                              {selectedImage && <img src={image} alt="Img" />}
                            </div>
                          </div>

                          <div className="flex items-center border-b border-blue-500 py-2">
                            <input
                              value={price}
                              onChange={(e) => setPrice(e.target.value)}
                              className="appearance-none w-full bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                              type="text"
                              id="price"
                              name="price"
                              placeholder={ReduceContext.price}
                            />
                          </div>

                          <div className="flex items-center border-b border-blue-500 py-2">
                            <input
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)}
                              className="appearance-none w-full bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                              type="text"
                              id="amount"
                              name="amount"
                              placeholder={ReduceContext.amount}
                            />
                          </div>

                          <div className="flex items-center border-b border-blue-500 py-2">
                            <input
                              value={reason}
                              onChange={(e) => setReason(e.target.value)}
                              className="appearance-none w-full bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                              type="text"
                              id="reason"
                              name="reason"
                              placeholder={ReduceContext.reason}
                            />
                          </div>

                          <div className="flex items-center border-b border-blue-500 py-2">
                            <input
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              className="appearance-none w-full bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                              type="text"
                              id="description"
                              name="description"
                              placeholder={ReduceContext.description}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-10 py-3 flex flex-row-reverse">
                    <TfiSave
                      onClick={onReduceCreateClicked}
                      className="text-blue-600 cursor-pointer"
                      size={20}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default ReduceNew;
