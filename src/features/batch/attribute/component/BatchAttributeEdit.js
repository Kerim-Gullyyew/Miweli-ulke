import React, { useEffect, useState, Fragment, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editBatchDetailAttribute } from "../../batch/batchDetailSlice";
import { editBatchAttribute } from "../batchAttributeSlice";
import { Dialog, Transition } from "@headlessui/react";
import { FaPen } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { TfiSave } from "react-icons/tfi";
import { BatchAttributeNewContext } from "../../BatchContext";

const BatchAttributeEdit = ({ attr_id }) => {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const { token } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const [error, SetError] = useState("");
  const [batchAttributeName, setBatchAttributeName] = useState("");

  const batchAttribute = useSelector((state) => state.batchAttribute);
  useEffect(() => {
    function b(attr_id) {
      return batchAttribute.data.filter((item) => {
        return item.id === attr_id;
      });
    }
    setBatchAttributeName(b(Number(attr_id))[0].title);
  }, [attr_id, batchAttribute.data]);

  const onSetbatchAttributeNameChanged = (e) => {
    setBatchAttributeName(e.target.value);
  };

  const BatchAttributeCreate = (e) => {
    // e.preventDefault();
    const json = {
      title: batchAttributeName,
    };

    dispatch(editBatchAttribute({ token, id: attr_id, json }))
      .unwrap()
      .then((res) => {
        dispatch(editBatchDetailAttribute({ data: res.data }));
        setOpen(false);
        SetError("");
      })
      .catch((err) => SetError(err));

    return () => {};
  };
  return (
    <>
      <FaPen
        onClick={() => setOpen(!open)}
        title="Atribut üýtgetmek"
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
                            {BatchAttributeNewContext.title}
                          </Dialog.Title>
                          <div className="text-red-600">
                            <ImCross className="cursor-pointer" onClick={() => setOpen(false)} size={20} />
                          </div>
                        </div>

                        <div className="mt-2 grid grid-cols-1 space-y-3">
                          <span className="text-red-600 text-center">
                            {error?.detail}
                          </span>
                          <label htmlFor="batchAttrName">
                            {BatchAttributeNewContext.name}
                          </label>

                          <div className="flex items-center border-b border-blue-500 py-2">
                            <input
                              value={batchAttributeName}
                              onChange={onSetbatchAttributeNameChanged}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  BatchAttributeCreate();
                                }
                              }}
                              className="appearance-none w-full bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                              type="text"
                              id="batchAttrName"
                              name="batchAttrName"
                              placeholder="Ady"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-10 py-3 flex flex-row-reverse">
                    <TfiSave
                      onClick={(e) => BatchAttributeCreate()}
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
    </>
  );
};

export default BatchAttributeEdit;
