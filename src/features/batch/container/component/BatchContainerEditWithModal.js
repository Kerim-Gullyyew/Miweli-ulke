import React, { useEffect, useState, Fragment, useRef } from "react";
import { TfiSave } from "react-icons/tfi";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { nameHelperHelper } from "../../../featuresSlice";
import { editBatchDetailContainer } from "../../batch/batchDetailSlice";
import { editContainerDetail } from "../containerDetailSlice";
import { editBatchContainer } from "../containerSlice";
import { FaPen } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { ContainerDetailContext } from "../../BatchContext";

const BatchContainerEditWithModal = ({
  title1,
  id1,
  id_number1,
  type_code1,
  pallet_count1,
}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [error, SetError] = useState("");
  const { token } = useSelector((state) => state.login);
  const [title, setTitle] = useState("");
  const [id_number, setId_number] = useState("");
  const [type_code, setType_code] = useState("");
  const [pallet_count, setPallet_count] = useState("");
  let id = id1;

  useEffect(() => {
    setTitle(title1);
    setId_number(id_number1);
    setType_code(type_code1);
    setPallet_count(pallet_count1);
  }, [title1, id_number1, type_code1, pallet_count1]);

  const onBatchContainerEditClicked = (e) => {
    e.preventDefault();

    const json = {
      title: title,
      id_number: id_number,
      type_code: type_code,
      pallet_count: pallet_count,
    };
    let isCancelled = false;
    dispatch(editBatchContainer({ id, token, json }))
      .unwrap()
      .then((res) => {
        dispatch(editBatchDetailContainer(res.data));
        dispatch(editContainerDetail(res.data));
        dispatch(nameHelperHelper("view"));
        SetError("");
        setTitle("");
        setId_number("");
        setType_code("");
        setPallet_count("");
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
                            TIR üýtgetmek
                          </Dialog.Title>
                          <div className="text-red-600">
                            <ImCross
                              className=" cursor-pointer"
                              onClick={() => setOpen(false)}
                              size={20}
                            />
                          </div>
                        </div>

                        <div className="mt-2 grid grid-cols-1 space-y-5">
                          <span className="text-red-600 text-center">
                            {error?.detail}
                          </span>
                          <label htmlFor="title">{ContainerDetailContext.title}:</label>
                          <div className="bg-white items-center border-b border-blue-500">
                            <input
                              type="text"
                              className="w-full appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                              value={title}
                              id="title"
                              name="title"
                              onChange={(e) => setTitle(e.target.value)}
                            />
                          </div>

                          <label htmlFor="id_number">{ContainerDetailContext.id_number}:</label>
                          <div className="bg-white items-center border-b border-blue-500">
                          <input
                            type="text"
                            className="w-full appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                            value={id_number}
                            id="id_number"
                            name="id_number"
                            onChange={(e) => setId_number(e.target.value)}
                          />
                          </div>
                          <label htmlFor="type_code">{ContainerDetailContext.type_code}:</label>
                          <div className="bg-white items-center border-b border-blue-500">
                          <input
                            type="text"
                            className="w-full appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                            value={type_code}
                            id="type_code"
                            name="type_code"
                            onChange={(e) => setType_code(e.target.value)}
                          />
                          </div>
                          <label htmlFor="pallet_count">{ContainerDetailContext.pallet_count}:</label>
                          <div className="bg-white items-center border-b border-blue-500">

                          
                          <input
                            type="text"
                            className="w-full appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                            value={pallet_count}
                            id="pallet_count"
                            name="pallet_count"
                            onChange={(e) => setPallet_count(e.target.value)}
                          />
                          </div>
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

export default BatchContainerEditWithModal;
