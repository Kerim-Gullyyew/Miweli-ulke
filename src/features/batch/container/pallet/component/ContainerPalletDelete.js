import React, { useState, Fragment, useRef } from "react";
import { BsTrash } from "react-icons/bs";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { ImCross } from "react-icons/im";
import { containerDetailPalletDelete } from "../../containerDetailSlice";
import { batchDetailPalletDelete } from "../../../batch/batchDetailSlice";
import { nameHelperPallet } from "../../../../featuresSlice";
import { deleteCellTransfer } from "../../../../transfer/transferSlice";


const ContainerPalletDelete = ({ id, title }) => {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [error, SetError] = useState("");
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.login);
const cont_id = useSelector((state) => state.containerDetail.info.id);
const transfer_id = useSelector((state) => state.containerPallet.transfer_id);
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   let isCancelled = false;
  //   try {
  //     await dispatch(containerDetailPalletDelete({ token, id }))
  //       .unwrap().then((res) => {
            
  //           dispatch(deleteCellTransfer({ token, id: transfer_id})).unwrap().then((res) => {
  //             dispatch(batchDetailPalletDelete({cont_id, id}))
  //             dispatch(nameHelperPallet(""));
  //             setOpen(false);
  //             SetError("");
  //           }).catch((err) => SetError(err.response));
  //       })
  //   } catch (err) {
  //     SetError(err);
  //   }
  //   return () => {
  //     isCancelled = true;
  //   };
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isCancelled = false;
    try {
      await dispatch(containerDetailPalletDelete({ token, id }))
        .unwrap()
        .then((res) => {
          dispatch(deleteCellTransfer({ token, id: transfer_id }))
            .unwrap()
            .then((res) => {
              dispatch(batchDetailPalletDelete({ cont_id, id }));
              dispatch(nameHelperPallet(""));
              setOpen(false);
              SetError("");
            })
            .catch((err) => SetError(err.response));
        });
    } catch (err) {
      SetError(err);
    }
    return () => {
      isCancelled = true;
    };
  };

  return (
    <>
      <BsTrash
        onClick={() => setOpen(!open)}
        title="TIR ayyrmak"
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
                            Pallet aýyrmak
                          </Dialog.Title>
                          <div className="text-red-600">
                            <ImCross className="cursor-pointer" onClick={() => setOpen(false)} size={20} />
                          </div>
                        </div>

                        <div className="mt-5 grid grid-cols-1 space-y-3">
                          <span className="text-red-600 text-center">
                            {error?.detail}
                          </span>
                          <div className="text-center text-lg font-bold">{title}</div>
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
  );
};

export default ContainerPalletDelete;
