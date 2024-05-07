import React, { useEffect, useState } from "react";
import { TfiSave } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { batchDetailContainersAttributeCreate } from "../../../batch/batchDetailSlice";
import { containerAttributeValueCreate } from "../../containerDetailSlice";
import { getContainerAttribute } from "../containerAttributeSlice";
import ContainerAttributeEdit from "./ContainerAttributeEdit";
import ContainerAttributeNew from "./ContainerAttributeNew";
import { Select, initTE } from "tw-elements";
const ContainerAttributeValue = () => {
  useEffect(() => {
    initTE({ Select });
  }, []);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.login);
  const [error, SetError] = useState("");
  const [containerAttributeName, setcontainerAttributeName] = useState("");
  const [containerAttributeValue, setcontainerAttributeValue] = useState("");
  const containerDetail = useSelector((state) => state.containerDetail);
  const containerId = containerDetail.info.id;
  const containerAttribute = useSelector((state) => state.containerAttribute);
  
  useEffect(() => {
    let isCancelled = false;
    dispatch(getContainerAttribute({ token }))
      .unwrap()
      .catch((err) => SetError(err));
    return () => {
      isCancelled = true;
    };
  }, [dispatch, token]);

  const onSetcontainerAttributeValueChanged = (e) => {
    setcontainerAttributeValue(e.target.value);
  };

  const createContainerAttributeClicked = (e) => {
    // e.preventDefault();

    const json = {
      value: containerAttributeValue,
      container_id: containerId,
      container_attr_id: containerAttributeName,
    };
    dispatch(containerAttributeValueCreate({ token, json }))
      .unwrap()
      .then((res) => {
        dispatch(batchDetailContainersAttributeCreate(res.data));
        // setcontainerAttributeName("");
        setcontainerAttributeValue("");
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
      <div className="flex space-x-3 items-center pb-4">
        <div className="font-bold ">
          <select
            name="nameAttribute"
            id="nameAttribute"
            onChange={(e) => setcontainerAttributeName(e.target.value)}
            data-te-select-init
            data-te-select-filter="true"
          >
            <option value=""></option>
            {containerAttribute.data.map((attr, key) => (
              <option key={key} value={attr.id}>
                  {attr.title}
              </option>
            ))}
          </select>
        </div>
        {containerAttributeName ? (
          <ContainerAttributeEdit id={containerAttributeName} />
        ) : (
          // <FaPen size={25} className="text-blue-600 cursor-pointer" />
          ""
        )}
        <ContainerAttributeNew />
        {/* <FaPlus className="text-yellow-600 cursor-pointer" size={25} /> */}
        <div className="pl-4">
          <div className="w-36 mx-3 flex items-center border-b border-blue-500 py-2">
            <input
              type="text"
              value={containerAttributeValue}
              onChange={onSetcontainerAttributeValueChanged}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  createContainerAttributeClicked();
                }
              }}
              className="w-full appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            />
          </div>
        </div>
        <div className="flex">
          <TfiSave
            size={20}
            onClick={(e) => createContainerAttributeClicked()}
            className="text-blue-600 cursor-pointer"
          />
        </div>
      </div>
    </>
  );
};

export default ContainerAttributeValue;
