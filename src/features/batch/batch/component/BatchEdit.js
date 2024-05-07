import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { editBatch } from "../batchSlice";
import { getBatchDetail } from "../batchDetailSlice";
import DatePicker, { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
import "react-datepicker/dist/react-datepicker.css";
import { BatchContext } from "../../BatchContext";
import getDateFormat from "../../../../utils/getDateFormat";
import getDateFormatBackend from "../../../../utils/getDateFormatBackend";
import { name } from "../../../featuresSlice";
import { IoMdReturnLeft } from "react-icons/io";
import { TfiSave } from "react-icons/tfi";
import { BsCalendarDate } from "react-icons/bs";
import Loader from "../../../../utils/Loader";
const BatchEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.login);
  const [error, SetError] = useState("");
  registerLocale("ru", ru);

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getBatchDetail({ id: id, token }))
        .unwrap()
        .catch((err) => SetError(err));
      return () => {};
    }
  }, [dispatch, id, token]);

  const batchDetail = useSelector((state) => state.batchDetail);
  const isLoading = useSelector((state) => state.batchDetail.isLoading);

  const [startDate, setStartDate] = useState("");
  const [title, setTitle] = useState(batchDetail.title);
  const [description, setDescription] = useState(batchDetail.description);
  const [date, setDate] = useState("");
  const onTitleChanged = (e) => {
    setTitle(e.target.value);
  };
  const onDescriptionChanged = (e) => {
    setDescription(e.target.value);
  };
  useEffect(() => {
    if (startDate) {
      setDate(getDateFormat(startDate));
    } else {
      setDate(getDateFormatBackend(batchDetail.arrived_at));
    }
  }, [batchDetail.arrived_at, startDate]);

  const handleSubmit = (e) => {
    // e.preventDefault();
    const json = {
      title: title,
      description: description,
      arrived_at: date,
    };
    dispatch(editBatch({ id, token, json }))
      .unwrap()
      .then(() => {
        setTitle("");
        setDescription("");
        SetError("");
        setDate("");
        dispatch(name("view"));
      })
      .catch((err) => SetError(err));
    return () => {};
  };

  let content = (
    <section className="text-lg font-poppins bg-white rounded-lg hover:shadow pb-3 mx-10">
      <div className="text-center flex bg-colorSecondaryBorder items-center rounded-t-xl py-2">
        <div className="font-bold font-poppins text-lg grow">Batch Edit</div>
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
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="grid grid-cols-10 overflow-auto">
              <div className="grid col-span-3 font-bold">
                {BatchContext?.arrived_at}:
              </div>
              <div className="col-span-7 flex items-center">
                <div className="border flex items-center">
                  <BsCalendarDate className="text-blue-700 w-20" size={20} />
                  <DatePicker
                    className="font-bold rounded p-2 leading-tight focus:outline-none"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    dateFormat="dd/MM/yyyy hh:mm"
                    timeIntervals={15}
                    locale="ru"
                    showYearDropdown
                    yearDropdownItemNumber={10}
                    dayClassName={() => "example-datepicker-day-class"}
                    popperClassName="example-datepicker-class"
                    todayButton="Şu gün"
                    scrollableYearDropdown
                  />
                </div>
                {!startDate ? (
                  <div className="pl-10 text-colorTextDarkBlue font-bold">
                    {batchDetail.arrived_at}
                  </div>
                ) : (
                  ""
                )}
              </div>
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
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSubmit();
                    }
                  }}
                  className="w-full appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                />
              </div>
            </div>
            <div className="grid grid-cols-10">
              <div className="grid col-span-3 font-bold">
                {BatchContext?.description}:
              </div>
              <div className="col-span-7 items-center border-b border-blue-500 py-2">
                <textarea
                  onChange={onDescriptionChanged}
                  type="text"
                  name="description"
                  id="description"
                  value={description}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSubmit();
                    }
                  }}
                  className="w-full appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end px-5">
              <TfiSave
                type="submit"
                className="text-blue-600 mx-3 cursor-pointer"
                onClick={(e) => handleSubmit()}
                size={20}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
  return content;
};

export default BatchEdit;
