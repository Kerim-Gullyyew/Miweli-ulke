import React from "react";
import { useState } from "react";
import { IoMdReturnLeft } from "react-icons/io";
import { TfiSave } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { nameHelperHelper } from "../../../featuresSlice";
import { editBatchDetailContainer } from "../../batch/batchDetailSlice";
import { ContainerDetailContext } from "../../BatchContext";
import { editContainerDetail } from "../containerDetailSlice";
import { editBatchContainer } from "../containerSlice";

const BatchContainerEdit = () => {
  const dispatch = useDispatch();
  const containerDetail = useSelector((state) => state?.containerDetail);
  const [error, SetError] = useState("");
  const { token } = useSelector((state) => state.login);
  const [title, setTitle] = useState(containerDetail.info.title);
  const [id_number, setId_number] = useState(containerDetail.info.id_number);
  const [type_code, setType_code] = useState(containerDetail.info.type_code);
  const [pallet_count, setPallet_count] = useState(
    containerDetail.info.pallet_count
  );
  let id = containerDetail.info.id;

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
      })
      .catch((err) => SetError(err));
    return () => {
      isCancelled = true;
    };
  };
  return (
    <>
      <section className="text-lg bg-white hover:shadow mt-10 border m-4 py-4 rounded-lg font-poppins px-10">
        <div className="text-center overflow-auto flex items-center py-2">
          <div className="font-bold font-poppins text-colorTextDarkBlue text-xl grow">
            TIR üýtgetmek
          </div>
          <div className="flex">
            <div
              onClick={() => {
                dispatch(nameHelperHelper("view"));
              }}
              className="mr-10 flex items-center justify-between cursor-pointer text-lg font-bold font-poppins text-center rounded-lg"
            >
              <IoMdReturnLeft className="font-bold text-red-700" size={30} />
            </div>
          </div>
        </div>

        <div className="text-center font-poppins font-bold text-red-600">
          {error}
        </div>
        <div className=" px-5 space-y-3 pt-3">
          <div className="flex-wrap md:grid md:grid-cols-2">
            <div className="grid grid-cols-3 space-y-3 items-center">
              <div className="grid grid-cols-1 whitespace-nowrap font-bold">
                {ContainerDetailContext.title}:
              </div>


              <div className="grid grid-cols-2 px-3 whitespace-nowrap">
              <div className="w-36 mx-3 flex items-center border-b border-blue-500 py-2">
                <input
                  type="text"
                  className="w-full appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              </div>
            </div>
            <div className="grid grid-cols-3 space-y-3 items-center">
              <div className=" grid-cols-1 whitespace-nowrap font-bold">
              {ContainerDetailContext.id_number}:
              </div>
              <div className=" grid-cols-2 px-3 whitespace-nowrap">
              <div className="w-36 mx-3 flex items-center border-b border-blue-500 py-2">
                <input
                  type="text"
                  className="w-full appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  value={id_number}
                  onChange={(e) => setId_number(e.target.value)}
                />
                </div>
              </div>
            </div>
          </div>
          <div className="flex-wrap md:grid md:grid-cols-2">
            <div className="grid grid-cols-3 space-y-3 items-center">
              <div className=" grid-cols-1 whitespace-nowrap font-bold">
              {ContainerDetailContext.type_code}:
              </div>
              <div className=" grid-cols-2 px-3 whitespace-nowrap">
              <div className="w-36 mx-3 flex items-center border-b border-blue-500 py-2">
                <input
                  type="text"
                  className="w-full appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  value={type_code}
                  onChange={(e) => setType_code(e.target.value)}
                />
              </div>
              </div>
            </div>
            <div className="grid grid-cols-3 space-y-3 items-center">
              <div className="grid grid-cols-1 whitespace-nowrap font-bold">
              {ContainerDetailContext.pallet_count}:
              </div>
              <div className="grid grid-cols-2 px-3 whitespace-nowrap">
              <div className="w-36 mx-3 flex items-center border-b border-blue-500 py-2">
                <input
                  type="text"
                  className="w-full appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  value={pallet_count}
                  onChange={(e) => setPallet_count(e.target.value)}
                />
              </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end px-5">
            <TfiSave
              size={20}
              type="submit"
              onClick={onBatchContainerEditClicked}
              className="text-blue-600 cursor-pointer"
            />
          </div>

        </div>
      </section>
    </>
  );
};

export default BatchContainerEdit;
