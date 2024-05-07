import React, { useEffect, useState, Fragment, useRef } from "react";
import { FaPen } from "react-icons/fa";
import { TfiSave } from "react-icons/tfi";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { getBatchDetail } from "../../../batch/batchDetailSlice";
import {
  getContainerDetail,
} from "../../containerDetailSlice";

import { ImCross } from "react-icons/im";
import { editPalletAttribute } from "./palletAttributeSlice";
import { editContainerPalletAttribute } from "../containerPalletSlice";

const PalletAttributeEdit = ({ id }) => {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const { token } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const [error, SetError] = useState("");
  const [AttributeName, setAttributeName] = useState("");
  const containerDetail = useSelector((state) => state.containerDetail);
  const batchDetail = useSelector((state) => state.batchDetail);
  const palletAttribute = useSelector((state) => state.palletAttribute);
  useEffect(() => {
    function b(id) {
      return palletAttribute.data.filter((item) => {
        return item.id === id;
      });
    }
    setAttributeName(b(Number(id))[0].title);
  }, [id, palletAttribute.data]);


  let batch_id = useSelector((state) => state.batchDetail.id)

  const AttributeEdit = (e) => {
    // e.preventDefault();
    let isCancelled = false;
    const json = {
      title: AttributeName,
    };

      dispatch(editPalletAttribute({ token, json, id }))
        .unwrap()
        .then((res) => {
          dispatch(editContainerPalletAttribute({
            data: res.data
            })
          );
            
          dispatch(getBatchDetail({ id: batch_id, token }))
        .unwrap().then((res) => {
          let cont_id = containerDetail.info.id
          let key = 0
          batchDetail.containers.map(cont => {
            if (cont.info.id === cont_id) {
              dispatch(getContainerDetail(res.data.containers[key]))
            }
            key = key + 1
          })
          SetError("")
          setOpen(false)
          // setAttributeName("")
          
        })
        .catch((err) => SetError(err));
      
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
        title="Täze atribut goşmak"
        className="text-blue-700 w-10 cursor-pointer"
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
                            Goşmaça maglumaty üýtgetmek
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
                              value={AttributeName}
                              onChange={(e) => setAttributeName(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  AttributeEdit();
                                }
                              }}
                              className="w-full appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                              id="batchAttrName"
                              name="batchAttrName"
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-10 py-3 flex flex-row-reverse">
                    <TfiSave
                      onClick={(e) => AttributeEdit()}
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

export default PalletAttributeEdit;
