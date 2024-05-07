import React, { useEffect, useState, Fragment, useRef } from "react";
import { FaPlus } from "react-icons/fa";
import { TfiSave } from "react-icons/tfi";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { batchDetailContainersAttributeCreate } from "../../../batch/batchDetailSlice";
import { containerAttributeValueCreate } from "../../containerDetailSlice";

import { createContainerAttribute } from "../containerAttributeSlice";
import { ImCross } from "react-icons/im";

const ContainerAttributeNew = () => {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const { token } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const [error, SetError] = useState("");
  const [containerAttributeName, setContainerAttributeName] = useState("");
  const [containerAttributeValue, setcontainerAttributeValue] = useState("");
  let [canCreate, setCanCreate] = useState(false);
  const containerDetail = useSelector((state) => state.containerDetail);
  const onSetcontainerAttributeValueChanged = (e) => {
    setcontainerAttributeValue(e.target.value);
  };
  const onSetcontainerAttributeNameChanged = (e) => {
    setContainerAttributeName(e.target.value);
  };

  useEffect(() => {
    if (containerAttributeName && containerAttributeValue) {
      setCanCreate(true);
    } else {
      setCanCreate(false);
    }
  }, [containerAttributeName, containerAttributeValue]);

  const ContainerAttributeCreate = (e) => {
    e.preventDefault();
    let isCancelled = false;
    const json = {
      title: containerAttributeName,
    };

    if (canCreate) {
      dispatch(createContainerAttribute({ token, json }))
        .unwrap()
        .then((res) => {
          const container_attr_id = res.data.id;
          const jsonforAttrValue = {
            value: containerAttributeValue,
            container_id: containerDetail.info.id,
            container_attr_id: container_attr_id,
          };
          dispatch(
            containerAttributeValueCreate({ token, json: jsonforAttrValue })
          )
            .unwrap()
            .then((res) => {
              dispatch(batchDetailContainersAttributeCreate(res.data));
              // setContainerAttributeName("");
              setcontainerAttributeValue("");
              SetError("");
              setOpen(false);
              // setAddClicked(false);
            });
        })
        .catch((err) => SetError(err));

      return () => {
        isCancelled = true;
      };
    } else {
      SetError({
        detail: "Ahli parametler doly bolmaly",
      });
    }
    return () => {
      isCancelled = true;
    };
  };
  return (
    <>
      <FaPlus
        onClick={() => setOpen(!open)}
        title="Täze atribut goşmak"
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all  xs:w-full xs:max-w-xl">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <div className="flex justify-between">
                          <Dialog.Title
                            as="h3"
                            className="text-base pb-3 font-semibold leading-6 text-gray-900"
                          >
                            TIR goşmaça maglumat goşmak
                          </Dialog.Title>
                          <div className="text-red-600">
                            <ImCross className="cursor-pointer" onClick={() => setOpen(false)} size={20} />
                          </div>
                        </div>

                        <div className="mt-2 grid grid-cols-1 space-y-3">
                          <span className="text-red-600 text-center">
                            {error?.detail}
                          </span>
                          <label htmlFor="batchAttrName">Ady</label>
                          <div className="flex items-center border-b border-blue-500 py-2">

                          <input
                            value={containerAttributeName}
                            onChange={onSetcontainerAttributeNameChanged}
                            className="w-full appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                            id="batchAttrName"
                            name="batchAttrName"
                            type="text"
                            placeholder="Ady"
                          />
                          </div>

                          <label htmlFor="batchAttrName">
                            Bahasy
                          </label>
                          <div className="flex items-center border-b border-blue-500 py-2">
                          <input
                            value={containerAttributeValue}
                            onChange={onSetcontainerAttributeValueChanged}
                            className="w-full appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                            id="batchAttrValue"
                            name="batchAttrValue"
                            type="text"
                            placeholder="Bahasy"
                          />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-10 py-3 flex flex-row-reverse">
                    <TfiSave
                      onClick={ContainerAttributeCreate}
                      size={20}
                      className="text-blue-600 cursor-pointer"
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
            onClick={() => {
              setAddClicked(true);
            }}
            className="border cursor-pointer  whitespace-nowrap p-2 font-medium"
          >
            <span className=" bg-colorBlue cursor-pointer p-2 px-3 text-white shadow rounded-lg">
              Add
            </span>
          </td>
        ) : (
          <td
            onClick={BatchAttributeCreate}
            className="border whitespace-nowrap p-2 font-medium"
          >
            <span className="bg-colorBlue cursor-pointer p-2 px-3 text-white shadow-md rounded-lg">
              Add Attribute
            </span>
          </td>
        )}
        <td className="border whitespace-nowrap p-2 font-medium">
          {addClicked && (
            <input
              value={batchAttributeName}
              onChange={onSetbatchAttributeNameChanged}
              className="shadow w-[200px] mx-3 appearance-none font-bold text-base border rounded py-2 text-colorTextDarkBlue leading-tight focus:outline-none focus:shadow-outline"
              type="text"
            />
          )}
        </td>

        <td className="border whitespace-nowrap p-2 font-medium">
          {addClicked && (
            <input
              value={batchAttributeValue}
              onChange={onSetbatchAttributeValueChanged}
              className="shadow w-[200px] mx-3 appearance-none font-bold text-base border rounded py-2 text-colorTextDarkBlue leading-tight focus:outline-none focus:shadow-outline"
              type="text"
            />
          )}
        </td>
        
      </tr> */}
    </>
  );
};

export default ContainerAttributeNew;
