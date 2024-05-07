import React, { useEffect, useState, Fragment, useRef } from "react";
import { TfiSave } from "react-icons/tfi";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { FaPen } from "react-icons/fa";
import { stockView } from "../../../featuresSlice";
import { getCamera } from "../../../stock/cameraSlice";
import { ImCross } from "react-icons/im";
import { IoMdReturnLeft } from "react-icons/io";
import { editTransferPallet, getTransferDetail } from "../../transferDetailSlice";
import { useParams } from "react-router-dom";

const TransferPalletEditWithModal = ({
  id1,
  pallet_id1,
  cellid1,
  price1,
  cellcode1,
}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [error, SetError] = useState("");
  const { token } = useSelector((state) => state.login);
  const [pallet_id, setPallet_id] = useState("");
  const [selectedCell, setselectedCell] = useState("");
  const [cellid, setCellid] = useState("");
  const [price, setPrice] = useState("");
  const { id } = useParams();
  const transfer_id = useSelector((state) => state.transferDetail.data.id);
  const [cellcode, setCellcode] = useState("");
  const views = useSelector((state) => state.views);
  const camera = useSelector((state) => state.camera);
  let id2 = id1;
  useEffect(() => {
    dispatch(stockView(""));
  }, [dispatch]);
  const stock = useSelector((state) => state.stock);

  useEffect(() => {
    setPallet_id(pallet_id1);
    setCellid(cellid1);
    setPrice(price1);
    setCellcode(cellcode1);

  }, [pallet_id1, cellid1, price1, cellcode1]);

  const onBatchContainerEditClicked = (e) => {
    e.preventDefault();

    const json = {
      price: price,
      pallet_id: pallet_id,
      transfer_id: transfer_id,
      cell_id: selectedCell ? selectedCell.id : cellid,
    };
    let isCancelled = false;
    dispatch(editTransferPallet({ id: id2, token, json }))
      .unwrap()
      .then((res) => {
        dispatch(getTransferDetail({ token, id }))
        SetError("");
        setOpen(false);
      })
      .catch((err) => SetError(err));
    return () => {
      isCancelled = true;
    };
  };
  return (
    <>
      <FaPen
        onClick={() => setOpen(!open)}
        title="Attributy uytgetmek"
        size={20}
        className="text-blue-600 cursor-pointer"
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all  xs:w-full xs:max-w-xl">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <div className="flex justify-between">
                          <Dialog.Title
                            as="h3"
                            className="text-base pb-3 font-semibold leading-6 text-gray-900"
                          >
                            Paledi üýtgetmek
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

                          <div className="text-center font-bold text-lg">
                            {selectedCell.code ? selectedCell.code : cellcode}
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
                                      <div style={{width: (stock.total_cells - stock.empty_cells)*100/stock.total_cells + '%'}} className="bg-colorGreen  flex bottom-0 h-3 rounded-r"></div>
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
                                                      onClick={() => cell.is_full ?
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
                      onClick={onBatchContainerEditClicked}
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

export default TransferPalletEditWithModal;
