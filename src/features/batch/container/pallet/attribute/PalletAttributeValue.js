import React, { useEffect, useState } from "react";
import { TfiSave } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { Select, initTE } from "tw-elements";
import { batchDetailpalletAttributeCreate } from "../../../batch/batchDetailSlice";
import { containerDetailpalletAttributeCreate } from "../../containerDetailSlice";
import { createPalletAttributeValue } from "../containerPalletSlice";
import PalletAttributeEdit from "./PalletAttributeEdit";
import PalletAttributeNew from "./PalletAttributeNew";
import { getPalletAttribute } from "./palletAttributeSlice";
const PalletAttributeValue = () => {
  useEffect(() => {
    initTE({ Select });
  }, []);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.login);
  const [error, SetError] = useState("");
  const [AttributeName, setAttributeName] = useState("");
  const [AttributeValue, setAttributeValue] = useState("");
  const containerPallet = useSelector((state) => state.containerPallet);
  const palletId = containerPallet.id;
  const palletAttribute = useSelector((state) => state.palletAttribute);
  const cont_id = useSelector((state) => state.containerDetail.info.id);

  useEffect(() => {
    let isCancelled = false;
    dispatch(getPalletAttribute({ token }))
      .unwrap()
      .catch((err) => SetError(err));
    return () => {
      isCancelled = true;
    };
  }, [dispatch, token]);

  const createAttributeClicked = (e) => {
    // e.preventDefault();

    const json = {
      value: AttributeValue,
      pallet_id: palletId,
      pallet_attr_id: AttributeName,
    };
    dispatch(createPalletAttributeValue({ token, json }))
      .unwrap()
      .then((res) => {
        dispatch(
          containerDetailpalletAttributeCreate({
            pallet_id: palletId,
            data: res.data,
          })
        );
        dispatch(
          batchDetailpalletAttributeCreate({
            cont_id: cont_id,
            pallet_id: palletId,
            data: res.data,
          })
        );
        // setAttributeName("");
        setAttributeValue("");
        SetError("");
      })
      .catch((err) => SetError(err));

    return () => {};
  };
  return (
    <>
      {error ? (
        <div className="text-red-600 font-bold font-poppins">
          {error?.detail}
        </div>
      ) : (
        ""
      )}
      <div className="flex flex-wrap space-x-2 items-center pb-4">
        <div className="w-40">
          <select
            name="nameAttribute"
            id="nameAttribute"
            onChange={(e) => setAttributeName(e.target.value)}
            data-te-select-init
            data-te-select-filter="true"
          >
            <option value=""></option>
            {palletAttribute.data.map((attr, key) => (
              <option key={key} value={attr.id}>
                {attr.title}
              </option>
            ))}
          </select>
        </div>
        {AttributeName ? (
          <PalletAttributeEdit id={AttributeName} />
        ) : (
          // <FaPen size={25} className="text-blue-600 cursor-pointer" />
          ""
        )}
        <PalletAttributeNew />

        {/* <FaPlus className="text-yellow-600 cursor-pointer" size={25} /> */}
        <div className="pl-4">
          <div className="w-36 mx-3 flex items-center border-b border-blue-500 py-2">
            <input
              type="text"
              value={AttributeValue}
              onChange={(e) => setAttributeValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  createAttributeClicked()
                }
              }}
              className="w-full appearance-none bg-transparent border-none text-colorTextDarkBlue mr-3 py-1 px-2 leading-tight focus:outline-none"
            />
          </div>
        </div>
        <div className="flex">
          <TfiSave
            size={20}
            onClick={(e) => createAttributeClicked()}
            className="text-blue-600 cursor-pointer"
          />
        </div>
      </div>
    </>
  );
};

export default PalletAttributeValue;
