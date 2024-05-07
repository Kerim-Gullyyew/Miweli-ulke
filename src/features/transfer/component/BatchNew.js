import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createBatch } from "../batchSlice";
import DatePicker, { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
import "react-datepicker/dist/react-datepicker.css";
import { BatchContext } from "../../BatchContext";
import getDateFormat from "../../../../utils/getDateFormat";
import { TfiSave } from "react-icons/tfi";
import { name } from "../../../featuresSlice";
import { IoMdReturnLeft } from "react-icons/io";
const BatchNew = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.login);
  const [error, SetError] = useState("");
  registerLocale("ru", ru);
  const [startDate, setStartDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onTitleChanged = (e) => {
    setTitle(e.target.value);
  };
  const onDescriptionChanged = (e) => {
    setDescription(e.target.value);
  };
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const newDate = getDateFormat(startDate);
    const json = {
      title: title,
      description: description,
      arrived_at: newDate,
    };
    let isCancelled = false;
    dispatch(createBatch({ token, json }))
      .unwrap()
      .then(() => {
        setTitle("");
        setDescription("");
        SetError("");
        navigate("/batch");
      })
      .catch((err) => SetError(err));
    return () => {
      isCancelled = true;
    };
  };

  let content = (
    <section className="text-lg font-poppins bg-white pb-3">
      <div className="text-center flex bg-colorSecondaryBorder items-center rounded-t-xl py-2">
        <div className="font-bold font-poppins text-lg grow">Batch New</div>
        {/* <div onClick={() => navigate(-1)} className="mr-10 flex items-center justify-between px-3 border-2 cursor-pointer hover:text-colorBlue border-colorBlue text-lg font-bold font-poppins bg-white text-center rounded-full shadow-lg">
          Yza dolanmak
        </div> */}
        <div
          onClick={() => {
            dispatch(name("view"));
          }}
          className="mr-10 flex items-center justify-between cursor-pointer text-lg font-bold font-poppins text-center rounded-lg"
        >
          <IoMdReturnLeft className="font-bold text-red-700" size={30} />
        </div>
      </div>
      <hr className="border border-colorBorder" />

      <div className="text-center font-poppins font-bold text-red-600">
        {error?.detail}
      </div>
      <div className=" px-5 space-y-3 pt-3">
        <div className="grid grid-cols-10 overflow-auto">
          <div className="grid col-span-3 font-bold">
            {BatchContext?.arrived_at}:
          </div>
          <DatePicker
            className="grid col-span-7 shadow appearance-none font-bold text-base border rounded w-[160px] p-2 text-colorTextDarkBlue leading-tight focus:outline-none focus:shadow-outline"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            dateFormat="dd/MM/yyyy hh:mm"
            timeIntervals={15}
            locale="ru"
            showYearDropdown
            yearDropdownItemNumber={10}
            scrollableYearDropdown
          />
        </div>
        <div className="grid grid-cols-10">
          <div className="grid col-span-3 font-bold">
            {BatchContext?.title}:
          </div>

          <div className="col-span-7 flex items-center border-b border-blue-500 py-2">
            <input
              onChange={onTitleChanged}
              type="text"
              name="title"
              id="title"
              value={title}
              className="w-full appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            />
          </div>
        </div>
        <div className="grid grid-cols-10">
          <div className="grid col-span-3 font-bold">
            {BatchContext?.description}:
          </div>

          <div className="col-span-7 flex items-center border-b border-blue-500 py-2">
            <textarea
              onChange={onDescriptionChanged}
              type="text"
              name="description"
              id="description"
              value={description}
              className="w-full appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            />
          </div>
        </div>
        <div className="flex justify-end px-5">
          <TfiSave
            size={20}
            onClick={handleSubmit}
            className="text-blue-600 cursor-pointer"
          />
        </div>
      </div>
    </section>
  );
  return content;
};

export default BatchNew;
