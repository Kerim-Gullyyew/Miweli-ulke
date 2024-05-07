import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import isOdd from "../utils/isOdd";
import { FaPlus } from "react-icons/fa";
import Loader from "../utils/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker, { registerLocale } from "react-datepicker";
import { FiFilter } from "react-icons/fi";
import ru from "date-fns/locale/ru";
import "react-datepicker/dist/react-datepicker.css";
import {
  createPcTransfer,
  getTransfer,
  getTransferFilter,
} from "../features/transfer/transferSlice";
import {
  TransferContext,
  TransferFilterContext,
  TransferType,
} from "../features/transfer/TransferContext";
import { paginationContext } from "../components/table/tableContext";
import getDateFormatFilter from "../utils/getDateFormatFilter";
const Transfer = () => {
  registerLocale("ru", ru);
  const { token } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const user_id = useSelector((state) => state.login.user_id);
  const isLoading = useSelector((state) => state.transfer.isLoading);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  let { search } = useLocation();
  useEffect(() => {
    let isCancelled = false;
    dispatch(getTransferFilter({ token, search }))
      .unwrap()
      .catch((err) => SetError(err));
    return () => {
      isCancelled = true;
    };
  }, [dispatch, search, token]);

  const transfer = useSelector((state) => state.transfer);
  const [error, SetError] = useState("");
  const navigate = useNavigate();
  const user = useSelector((state) => state.login.user_id);
  function handleClick({ link }) {
    try {
      dispatch(getTransfer({ token, link }))
        .unwrap()
        .then((res) => {});
    } catch (err) {
      SetError(err);
    }
    return () => {};
  }
  const onFilter = async (e) => {
    e.preventDefault();

    const newstartDate = getDateFormatFilter(startDate);
    const newendDate = getDateFormatFilter(endDate);
    
    navigate(`/transfer/?startdate=` + newstartDate + `&enddate=` + newendDate + `&user=` + user);

  };

  const createTransfer = async (e) => {
    e.preventDefault();
    const json = {
      transition_type: TransferType.outcome,
      user: user_id,
    };
    let isCancelled = false;

    try {
      await dispatch(createPcTransfer({ token, json }))
        .unwrap()
        .then((res) => {
          navigate("/transfer/" + res.data.id);
          SetError("");
        });
    } catch (err) {
      SetError(err);
    }
    return () => {
      isCancelled = true;
    };
  };
  let content = (
    <section className="bg-white rounded-lg hover:shadow">
      <p className="text-center text-lg font-bold font-poppins text-red-600">
        {error?.detail}
      </p>
      <div className="text-center flex bg-colorSecondaryBorder items-center rounded-t-xl py-2">
        <div className="font-bold font-poppins text-lg grow">Transfer</div>

        <div className="mr-10 flex items-center p-1 cursor-pointer bg-blue-600 text-white  text-lg font-bold font-poppins text-center rounded-lg">
          <FaPlus onClick={createTransfer} />
        </div>
      </div>
      <hr className="border border-colorBorder" />


      <div className="flex flex-wrap px-10 py-3 justify-center">
               
                <div className="pr-3">
                  <div className="">{TransferFilterContext?.startdate}:</div>
                  <DatePicker
                    className="shadow appearance-none font-bold text-base border rounded w-[160px] p-2 text-colorTextDarkBlue leading-tight focus:outline-none focus:shadow-outline"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    dateFormat="yyyy/MM/dd hh:mm"
                    timeIntervals={15}
                    locale="ru"
                    showYearDropdown
                    yearDropdownItemNumber={10}
                    scrollableYearDropdown
                  />
                </div>

                <div className="pr-3">
                  <div className="">{TransferFilterContext?.enddate}:</div>
                  <DatePicker
                    className="shadow appearance-none font-bold text-base border rounded w-[160px] p-2 text-colorTextDarkBlue leading-tight focus:outline-none focus:shadow-outline"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    dateFormat="yyyy/MM/dd hh:mm"
                    timeIntervals={15}
                    locale="ru"
                    minDate={startDate}
                    showYearDropdown
                    yearDropdownItemNumber={10}
                    scrollableYearDropdown
                  />
                </div>
                    <div>
                    <div>Filter</div>
                  <FiFilter onClick={onFilter} className="flex w-full text-blue-600  cursor-pointer" size={30} />
                    </div>
                  {/* {BatchFilterContext.search} */}
              </div>



      <div className="w-full">
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="inline-block overflow-x-auto min-w-full p-2">
              <div className="overflow-hidden">
                {isLoading ? (
                  <Loader />
                ) : (
                  <table className="min-w-full text-left text-sm font-light">
                    <thead className="font-medium">
                      <tr className=" bg-blue-50 text-colorTextDarkBlue">
                        <th scope="col" className=" px-6 py-2">
                          {TransferContext.title}
                        </th>
                        <th scope="col" className=" px-6 py-2">
                          {TransferContext.created_at}
                        </th>
                        <th scope="col" className=" px-6 py-2">
                          {TransferContext.updated_at}
                        </th>
                        <th scope="col" className=" px-6 py-2">
                          {TransferContext.creater}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <>
                        {transfer.data?.results?.map((transfer, key) => (
                          <tr
                            key={key}
                            onClick={() => navigate("/transfer/" + transfer.id)}
                            className={
                              isOdd(key)
                                ? " bg-white cursor-pointer hover:bg-blue-200"
                                : " bg-colorIconGray hover:bg-blue-200 cursor-pointer"
                            }
                          >
                            <td className=" whitespace-nowrap p-2 font-medium">
                              {transfer.transition_type}
                            </td>
                            <td className=" whitespace-nowrap p-2 font-medium">
                              {transfer.created_at}
                            </td>
                            <td className=" whitespace-nowrap p-2 font-medium">
                              {transfer.updated_at}
                            </td>
                            <td className=" whitespace-nowrap p-2 font-medium">
                              {transfer.user.username}
                            </td>
                          </tr>
                        ))}
                      </>
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav
        aria-label="Page navigation"
        className="flex justify-end xs:pr-5 pb-3"
      >
        <ul className="inline-flex">
          <li>
            {transfer.data.previous !== null && (
              <button
                onClick={() => handleClick({ link: transfer.data.previous })}
                className="h-10 px-5 text-indigo-600 transition-colors duration-150 bg-white rounded-l-lg focus:shadow-outline hover:bg-indigo-100"
              >
                {paginationContext.prev}
              </button>
            )}
          </li>

          <button className="h-10 px-5 text-indigo-600 transition-colors duration-150 bg-white focus:shadow-outline hover:bg-indigo-100">
            {transfer.data.count}
          </button>

          <li>
            {transfer.data.next !== null && (
              <button
                onClick={() => handleClick({ link: transfer.data.next })}
                className="h-10 px-5 text-indigo-600 transition-colors duration-150 bg-white rounded-l-lg focus:shadow-outline hover:bg-indigo-100"
              >
                {paginationContext.next}
              </button>
            )}
          </li>
        </ul>
      </nav>
    </section>
  );
  return content;
};

export default Transfer;
