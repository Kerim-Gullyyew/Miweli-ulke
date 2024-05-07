import React, { useState, Fragment, useRef } from "react";
import { BsTrash } from "react-icons/bs";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { ImCross } from "react-icons/im";
import { batchattrdelete } from "../../batch/batchDetailSlice";

const BatchAttributeValueDelete = ({attr_id}) => {

    const [open, setOpen] = useState(false);
    const cancelButtonRef = useRef(null);
    const [error, SetError] = useState("");
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.login);

  
    const handleSubmit = async (e) => {
      e.preventDefault();
      dispatch(batchattrdelete({ token, id: attr_id }))
        .unwrap()
        .then((res) => {
            setOpen(false);
            SetError("");
        })
        .catch((err) => SetError(err));
      return () => {};
    };
  return (
    <>
      <BsTrash
        onClick={() => setOpen(!open)}
        size={20}
        className="text-red-800 col-span-2 mr-3 cursor-pointer"
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
                            Move aýyrmak
                          </Dialog.Title>
                          <div className="text-red-600">
                            <ImCross className="cursor-pointer" onClick={() => setOpen(false)} size={20} />
                          </div>
                        </div>

                        <div className="mt-5 grid grid-cols-1 space-y-3">
                          <span className="text-red-600 text-center">
                            {error?.detail}
                          </span>
                          <BsTrash
                            onClick={handleSubmit}
                            className="text-red-600 cursor-pointer mx-auto"
                            size={40}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}

export default BatchAttributeValueDelete