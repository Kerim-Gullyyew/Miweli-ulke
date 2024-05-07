import React, { useEffect, useState } from "react";
import { TfiSave } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BatchContainerEditWithModal from "../../container/component/BatchContainerEditWithModal";
import { getBatchContainer } from "../../container/containerSlice";
import { Select, initTE } from "tw-elements";
import { batchContainerValueCreate } from "../batchDetailSlice";
const BatchContainerValue = () => {
  useEffect(() => {
    initTE({ Select });
  }, []);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { token } = useSelector((state) => state.login);
  const [error, SetError] = useState("");

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getBatchContainer({ token }))
        .unwrap()
        .catch((err) => SetError(err));
      return () => {
      };
    }
  }, [dispatch, id, token]);
  const container = useSelector((state) => state.container);
  const [option, setOption] = useState("");
  const [cont_id, setContId] = useState("");
  const [title, setTitle] = useState("");
  const [id_number, setId_number] = useState("");
  const [type_code, setType_code] = useState("");
  const [pallet_count, setPallet_count] = useState("");
  const [created_at, setCreated_at] = useState("");
  const [updated_at, setUpdated_at] = useState("");
  useEffect(() => {
    if (option) {
      setTitle(container?.results[option]?.title);
      setContId(container?.results[option]?.id);
      setId_number(container?.results[option]?.id_number);
      setType_code(container?.results[option]?.type_code);
      setPallet_count(container?.results[option]?.pallet_count);
      setCreated_at(container?.results[option]?.created_at);
      setUpdated_at(container?.results[option]?.updated_at);
    } else {
      setTitle("");
      setContId("");
      setId_number("");
      setType_code("");
      setPallet_count("");
      setCreated_at("");
      setUpdated_at("");
    }
  }, [option, container?.results]);

  const createBatchContainerClicked = (e) => {
    e.preventDefault();

    const json = {
      batch_id: id,
      container_id: container?.results[option]?.id,
    };
    dispatch(batchContainerValueCreate({ token, json }))
      .unwrap()
      .then(() => {
        setContId("");
        setTitle("");
        setId_number("");
        setType_code("");
        setPallet_count("");
        setCreated_at("");
        setUpdated_at("");
        SetError("");
      })
      .catch((err) => SetError(err));

    return () => {};
  };
  return (
    <>
      <tr className="">
        <td className=""></td>
        <td className="text-lg font-bold text-red-600">{error.detail}</td>
        <td className=""></td>
      </tr>

      <tr className="bg-white">
        <td className=" whitespace-nowrap p-2 font-medium">
          <div className="flex justify-center space-x-3 items-center">
          
            
          <select
            name="name"
            id="name"
            onChange={(e) => setOption(e.target.value)}
            data-te-select-init
            data-te-select-filter="true"
          >
            <option value=""></option>
            {container.results.map((cont, key) => (
              <option key={key} value={key}>
                {cont.title}
              </option>
            ))}
          </select>


            {option ? (
              <BatchContainerEditWithModal
                id1={cont_id}
                title1={title}
                id_number1={id_number}
                type_code1={type_code}
                pallet_count1={pallet_count}
              />
            ) : (
              ""
            )}
          </div>
        </td>
        <td className=" font-medium">{id_number}</td>
        <td className=" font-medium">{type_code}</td>

        <td className=" font-medium">{pallet_count}</td>
        <td className=" font-medium">{created_at}</td>
        <td className=" font-medium">{updated_at}</td>
        <td
          onClick={createBatchContainerClicked}
          className=" font-medium"
        >
          <div className="flex justify-center">
            <TfiSave size={20} className=" text-blue-600" />
          </div>
        </td>
 
      </tr>
    </>
  );
};

export default BatchContainerValue;
