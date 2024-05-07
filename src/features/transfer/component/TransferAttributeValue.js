import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TfiSave } from "react-icons/tfi";

import { Select, initTE } from "tw-elements";
import { getTransferAttribute } from "../attribute/transferAttributeSlice";
import TransferAttributeNew from "../attribute/component/TransferAttributeNew";
import { AttributeValueCreate } from "../transferDetailSlice";
import TransferAttributeEdit from "../attribute/component/TransferAttributeEdit";

const TransferAttributeValue = () => {
  useEffect(() => {
    initTE({ Select });
  }, []);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.login);
  const [error, SetError] = useState("");
  const [AttributeName, setAttributeName] = useState("");
  const [AttributeValue, setAttributeValue] = useState("");
  const pctransfer_id = useSelector((state) => state.transferDetail.data.id);

  useEffect(() => {
    let isCancelled = false;
    dispatch(getTransferAttribute({ token }))
      .unwrap()
      .catch((err) => SetError(err));
    return () => {
      isCancelled = true;
    };
  }, [dispatch, token]);
  const { transferAttribute } = useSelector((state) => state);
  const onSetAttributeValueChanged = (e) => {
    setAttributeValue(e.target.value);
  };

  const createAttributeClicked = (e) => {
    // e.preventDefault();

    const json = {
      value: AttributeValue,
      pctransfer_id: pctransfer_id,
      pctransfer_attribute_id: AttributeName,
    };
    dispatch(AttributeValueCreate({ token, json }))
      .unwrap()
      .then(() => {
        setAttributeName("");
        setAttributeValue("");
        SetError("");
      })
      .catch((err) => SetError(err));

    return () => {};
  };
  return (
    <>
      {error ? (
        <div className="text-red-600 font-poppins font-bold">
          {error?.detail}
        </div>
      ) : (
        ""
      )}

      <div className="space-x-3 flex flex-wrap items-center ">
        <div className="font-bold w-40 mb-3 mr-3">
          <select
            name="name"
            id="name"
            onChange={(e) => setAttributeName(e.target.value)}
            data-te-select-init
            data-te-select-filter="true"
          >
            <option value=""></option>
            {transferAttribute.data.map((attr, key) => (
              <option key={key} value={attr.id}>
                {attr.title}
              </option>
            ))}
          </select>
        </div>
        {AttributeName ? <TransferAttributeEdit attr_id={AttributeName} /> : ""}
        <TransferAttributeNew />
        <div className="mb-3 mr-3 w-32 flex-1 items-center border-b border-blue-500 py-2">
          <input
            value={AttributeValue}
            onChange={onSetAttributeValueChanged}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                createAttributeClicked();
              }
            }}
            className="appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Baha"
            ref={null}
          />
        </div>
        <div className=" flex flex-1">
          <TfiSave
            onClick={() => createAttributeClicked()}
            size={20}
            className="text-blue-600 cursor-pointer"
          />
        </div>
      </div>
    </>
  );
};

export default TransferAttributeValue;
