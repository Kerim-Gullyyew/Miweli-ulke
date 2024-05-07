import React, { useEffect, useState, Fragment, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { FaPlus } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useParams } from "react-router-dom";
import { TfiSave } from "react-icons/tfi";
import {
  addToSelected,
  emptySelected,
  stockView,
} from "../../../featuresSlice";
import { getCamera } from "../../../stock/cameraSlice";
import { IoMdReturnLeft } from "react-icons/io";
import {
  createTransferPallet,
  getTransferDetail,
} from "../../transferDetailSlice";
import { getStock } from "../../../stock/stockSlice";
import { AiOutlineClear } from "react-icons/ai";
const TransferPalletNew = () => {
  const dispatch = useDispatch();
  const cancelButtonRef = useRef(null);
  const { token } = useSelector((state) => state.login);
  const [error, SetError] = useState("");
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [price, setPrice] = useState("");
  const [selectedCell, setselectedCell] = useState("");
  const views = useSelector((state) => state.views);
  const camera = useSelector((state) => state.camera);
  const transfer_id = useSelector((state) => state.transferDetail.data.id);
  const selectedCells = useSelector((state) => state.views.selectedCells);
  console.log(selectedCells);
  useEffect(() => {
    dispatch(getStock({ token }));
    dispatch(stockView(""));
  }, [dispatch, token]);

  const stock = useSelector((state) => state.stock);
  const createBatchContainerClicked = (e) => {
    e.preventDefault();

    if (selectedCells?.length > 0) {
      selectedCells.forEach((element) => {
        const json = {
          price: price,
          pallet_id: element?.pallet?.id,
          transfer_id: transfer_id,
          cell_id: element.id,
        };
        dispatch(createTransferPallet({ token, json }))
          .unwrap()
          .then((res) => {
            dispatch(getTransferDetail({ token, id }));
          })
          .catch((err) => SetError(err));
        return () => {};
      });
      dispatch(emptySelected());
      setPrice("");
      setselectedCell("");
      setOpen(false);
      SetError("");
    } else {
      SetError({ detail: "Oyjuk saylanmadyk" });
    }
  };

  return (
    <>
      <FaPlus
        onClick={() => setOpen(!open)}
        title="Täze atribut goşmak"
        size={20}
        className="text-yellow-600 m-3 cursor-pointer"
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all xs:w-full xs:max-w-7xl">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <div className="flex justify-between">
                          <Dialog.Title
                            as="h3"
                            className="text-base pb-3 font-semibold leading-6 text-gray-900"
                          >
                            Palet goşmak
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
                          <div className="flex border justify-between items-center">
                            <div className="text-center font-bold text-lg">
                              {selectedCells &&
                                selectedCells.map((cell) => {
                                  return cell.code + " / ";
                                })}
                            </div>
                            {selectedCells?.length > 0 ? (
                              <div>
                                <AiOutlineClear
                                  onClick={() => dispatch(emptySelected())}
                                  className="text-red-600 shadow-lg"
                                  size={30}
                                />
                              </div>
                            ) : (
                              ""
                            )}
                          </div>

                          <label htmlFor="price">Bahasy:</label>
                          <div className="bg-white items-center border-b border-blue-500">
                            <input
                              type="text"
                              className="w-full appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                              value={price}
                              id="price"
                              name="price"
                              onChange={(e) => setPrice(e.target.value)}
                            />
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
                                        .then(() => dispatch(stockView("cell")))
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
                                    <p className="text-black font-bold text-right pr-2">
                                      {(
                                        ((stock.total_cells -
                                          stock.empty_cells) *
                                          100) /
                                        stock.total_cells
                                      ).toFixed(1)}
                                      %
                                    </p>
                                    <div className="flex bg-white border-2 border-colorSecondaryBorder mb-1">
                                      <div
                                        style={{
                                          width:
                                            ((stock.total_cells -
                                              stock.empty_cells) *
                                              100) /
                                              stock.total_cells +
                                            "%",
                                        }}
                                        className="bg-colorGreen flex bottom-0 h-3 rounded-r"
                                      ></div>
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
                                    <div
                                      key={key}
                                      className="flex w-full pr-14"
                                    >
                                      {row.columns.map((col, key) => (
                                        <div key={key} className="flex">
                                          <div className="mx-auto">
                                            {col.cells.map((cell, key) => (
                                              <Fragment key={key}>
                                                {/* {cell.product !== null ? ( */}
                                                <div
                                                  onClick={() => {
                                                    if (cell.is_full) {
                                                      setselectedCell(cell);
                                                      dispatch(
                                                        addToSelected(cell)
                                                      );
                                                    } else {
                                                      setselectedCell("");
                                                    }
                                                  }}
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

                                <div className=" grid grid-cols-3"></div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-10 py-3 flex flex-row-reverse">
                    <TfiSave
                      onClick={createBatchContainerClicked}
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

      {/* Error */}
      {/* <tr className="">
        <td className=""></td>
        <td className="text-lg font-bold text-red-600">{error.detail}</td>
        <td className=""></td>
      </tr> */}
      {/* EndError */}

      {/* <tr className="bg-white">
        {!addClicked ? (
          <td
            onClick={() => setAddClicked(true)}
            className="border font-medium "
          >
            <div className="shadow whitespace-nowrap cursor-pointer p-2 px-2 bg-colorBlue text-white mx-3 appearance-none font-bold text-sm rounded-lg py-2 leading-tight focus:outline-none focus:shadow-outline">
              Add
            </div>
          </td>
        ) : (
          <td
            onClick={createBatchContainerClicked}
            className="border font-medium "
          >
            <span className="shadow whitespace-nowrap cursor-pointer p-2 px-2 bg-colorBlue text-white mx-3 appearance-none font-bold text-sm rounded-lg py-2 leading-tight focus:outline-none focus:shadow-outline">
              Add Container
            </span>
          </td>
        )}

        <td className="border font-medium">
          {addClicked ? (
          <input
            type="text"
            className="shadow w-[150px] mx-3 appearance-none font-bold text-base border rounded py-2 text-colorTextDarkBlue leading-tight focus:outline-none focus:shadow-outline"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          ):("")}
        </td>
        <td className="border font-medium">
          {addClicked ? (
          <input
            type="text"
            className="shadow w-[100px] mx-3 appearance-none font-bold text-base border rounded py-2 text-colorTextDarkBlue leading-tight focus:outline-none focus:shadow-outline"
            value={id_number}
            onChange={(e) => setId_number(e.target.value)}
          />
          ):("")}
        </td>
        <td className="border font-medium">
          {addClicked ? (
          <input
            type="text"
            className="shadow w-[100px] mx-3 appearance-none font-bold text-base border rounded py-2 text-colorTextDarkBlue leading-tight focus:outline-none focus:shadow-outline"
            value={type_code}
            onChange={(e) => setType_code(e.target.value)}
          />
          ):("")}
        </td>

        <td className="border font-medium">
          {addClicked ? (
          <input
            type="text"
            className="shadow w-[100px] mx-3 appearance-none font-bold text-base border rounded py-2 text-colorTextDarkBlue leading-tight focus:outline-none focus:shadow-outline"
            value={pallet_count}
            onChange={(e) => setPallet_count(e.target.value)}
          />
          ):("")}
        </td>

      </tr> */}
    </>
  );
};

export default TransferPalletNew;
