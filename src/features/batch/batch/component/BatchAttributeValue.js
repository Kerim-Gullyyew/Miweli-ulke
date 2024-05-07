import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBatchAttribute } from "../../attribute/batchAttributeSlice";
import { batchAttributeValueCreate } from "../batchDetailSlice";
import { TfiSave } from "react-icons/tfi";

import BatchAttributeNew from "../../attribute/component/BatchAttributeNew";
import BatchAttributeEdit from "../../attribute/component/BatchAttributeEdit";
import { Select, initTE } from "tw-elements";

const BatchAttributeValue = () => {
  useEffect(() => {
    initTE({ Select });
  }, []);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { token } = useSelector((state) => state.login);
  const [error, SetError] = useState("");
  const [batchAttributeName, setbatchAttributeName] = useState("");
  const [batchAttributeValue, setbatchAttributeValue] = useState("");
  const [seed, setSeed] = useState(1)
  useEffect(() => {
    dispatch(getBatchAttribute({ token }))
      .unwrap()
      .catch((err) => SetError(err));
    return () => {};
  }, [dispatch, token]);
  const { batchAttribute } = useSelector((state) => state);
  const onSetbatchAttributeValueChanged = (e) => {
    setbatchAttributeValue(e.target.value);
  };

  const createBatchAttributeClicked = (e) => {
    // e.preventDefault();

    const json = {
      value: batchAttributeValue,
      batch_id: id,
      batch_batch_id: batchAttributeName,
    };
    dispatch(batchAttributeValueCreate({ token, json }))
      .unwrap()
      .then(() => {
        // setbatchAttributeName("");
        setbatchAttributeValue("");
        SetError("");
        // setSeed(Math.random());
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

      <div className="flex space-x-3 flex-wrap items-center ">
        <div className="font-bold w-40 mb-3 mr-3">
          <select
            name="name"
            id="name"
            onChange={(e) => setbatchAttributeName(e.target.value)}
            data-te-select-init
            data-te-select-filter="true"
          >
            <option value=""></option>
            {batchAttribute.data.map((attr, key) => (
              <option key={key} value={attr.id}>
                {attr.title}
              </option>
            ))}
          </select>
        </div>
        {batchAttributeName ? (
            <BatchAttributeEdit attr_id={batchAttributeName} />
          ) : (
            ""
          )}
          <BatchAttributeNew />
        <div className="mb-3 mr-3 w-32 flex-1 items-center border-b border-blue-500 py-2">
          <input
            value={batchAttributeValue}
            onChange={onSetbatchAttributeValueChanged}
            className="appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Baha"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                createBatchAttributeClicked();
              }
            }}
            ref={null}
          />
        </div>
          
        <div className="  flex flex-1">
          <TfiSave
            onClick={(e) => createBatchAttributeClicked()}
            size={20}
            className="text-blue-600 cursor-pointer"
          />
          
        </div>
      </div>
    </>
  );
};

export default BatchAttributeValue;
