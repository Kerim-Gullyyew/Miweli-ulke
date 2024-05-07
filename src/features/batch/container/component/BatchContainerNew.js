import React, { useState, Fragment, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { FaPlus } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useParams } from "react-router-dom";
import { batchContainerValueCreate } from "../../batch/batchDetailSlice";
import { createBatchContainer } from "../containerSlice";
import { TfiSave } from "react-icons/tfi";
import { ContainerDetailContext } from "../../BatchContext";
const BatchContainerNew = () => {
  const dispatch = useDispatch();
  const cancelButtonRef = useRef(null);
  const { id } = useParams();
  const { token } = useSelector((state) => state.login);
  const [error, SetError] = useState("");
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [id_number, setId_number] = useState("");
  const [type_code, setType_code] = useState("");
  const [pallet_count, setPallet_count] = useState("");

  const createBatchContainerClicked = (e) => {
    e.preventDefault();

    const json = {
      title: title,
      id_number: id_number,
      type_code: type_code,
      pallet_count: pallet_count,
    };

    dispatch(createBatchContainer({ token, json }))
      .unwrap()
      .then((res) => {
        const jsonforContainerValue = {
          batch_id: id,
          container_id: res.data.id,
        };
        dispatch(
          batchContainerValueCreate({ token, json: jsonforContainerValue })
        )
          .unwrap()
          .then(() => {
            setTitle("");
            setId_number("");
            setType_code("");
            setPallet_count("");
            SetError("");
            setOpen(false);
          });
      })
      .catch((err) => SetError(err));

    return () => {};
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all  xs:w-full xs:max-w-xl">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <div className="flex justify-between">
                          <Dialog.Title
                            as="h3"
                            className="text-base pb-3 font-semibold leading-6 text-gray-900"
                          >
                            TIR goşmak
                          </Dialog.Title>
                          <div className="text-red-600">
                            <ImCross className=" cursor-pointer" onClick={() => setOpen(false)} size={20} />
                          </div>
                        </div>

                        <div className="mt-2 grid grid-cols-1 space-y-3">
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
                          <label htmlFor="id_number">
                          {ContainerDetailContext.id_number}
                          </label>
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
                          <label htmlFor="type_code">
                          {ContainerDetailContext.type_code}
                          </label>
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
                          <label htmlFor="pallet_count">
                          {ContainerDetailContext.pallet_count}
                          </label>
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
                    
                    <TfiSave onClick={createBatchContainerClicked} className="text-blue-600 cursor-pointer" size={20} />
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

export default BatchContainerNew;
