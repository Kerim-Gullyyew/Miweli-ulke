import React, { useEffect } from "react";
import {
  BatchContext,
  BatchFilterContext,
} from "../features/batch/BatchContext";
import { useDispatch, useSelector } from "react-redux";
import { getBatch, getBatchFilter } from "../features/batch/batch/batchSlice";
import { useState } from "react";
import isOdd from "../utils/isOdd";
import { FaPlus } from "react-icons/fa";
import DatePicker, { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { name } from "../features/featuresSlice";
import BatchNew from "../features/batch/batch/component/BatchNew";
import { paginationContext } from "../components/table/tableContext";
import { BsSearch } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
import Loader from "../utils/Loader";
import getDateFormatFilter from "../utils/getDateFormatFilter";
const Batch = () => {
  registerLocale("ru", ru);
  const { token } = useSelector((state) => state.login);
  const isLoading = useSelector((state) => state.batch.isLoading);
  let { search } = useLocation();

  const dispatch = useDispatch();
  useEffect(() => {
    let isCancelled = false;
    dispatch(getBatchFilter({ token, search }))
      .unwrap()
      .catch((err) => SetError(err));
    return () => {
      isCancelled = true;
    };
  }, [dispatch, token, search]);
  const views = useSelector((state) => state.views);
  const batch = useSelector((state) => state.batch);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, SetError] = useState("");
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const [title, setTitle] = useState("");
  useEffect(() => {
    if (searchParams.get("title") === null) {
      setTitle("");
    }else{
      setTitle(searchParams.get("title"));
    }
  }, [searchParams])


  function handleClick({ link }) {
    try {
      dispatch(getBatch({ token, link }))
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
    
    navigate(`/batch/?title=` + title + `&startdate=` + newstartDate + `&enddate=` + newendDate);

  };
  let content = (
    <>
      {views.name === "view" && (
        <section className="bg-white rounded-lg hover:shadow">
          {isLoading ? (
            <>
              <Loader />
            </>
          ) : (
            <>
              <p className="text-center text-lg font-bold font-poppins text-red-600">
                {error?.detail}
              </p>
              <div className="text-center flex bg-colorSecondaryBorder items-center rounded-t-xl py-2">
                <div className="font-bold font-poppins text-lg grow">
                  Partiýa
                </div>

                <div className="mr-10 flex items-center p-1 cursor-pointer bg-blue-600 text-white  text-lg font-bold font-poppins text-center rounded-lg">
                  <FaPlus
                    onClick={() => {
                      dispatch(name("new"));
                    }}
                  />
                </div>
              </div>
              <hr className="border border-colorBorder" />
              <div className="flex flex-wrap px-10 py-3 justify-center">
                <div className="pr-3">
                  <label htmlFor="title">{BatchFilterContext.title}:</label>
                  <div className="bg-white items-center border-b border-blue-500">
                    <input
                      type="text"
                      className="w-full appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                      value={title}
                      id="title"
                      name="title"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>

                <div className="pr-3">
                  <div className="">{BatchFilterContext?.startdate}:</div>
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
                  <div className="">{BatchFilterContext?.enddate}:</div>
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
                        <table className="min-w-full text-left text-sm font-light">
                          <thead className="font-medium">
                            <tr className=" bg-blue-50 text-colorTextDarkBlue">
                              <th scope="col" className=" px-6 py-2">
                                {BatchContext.title}
                              </th>
                              <th scope="col" className=" px-6 py-2">
                                {BatchContext.description}
                              </th>
                              <th scope="col" className=" px-6 py-2">
                                {BatchContext.arrived_at}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {batch?.results?.map((batch, key) => (
                              <tr
                                key={key}
                                onClick={() => navigate("/batch/" + batch.id)}
                                className={
                                  isOdd(key)
                                    ? " bg-white cursor-pointer hover:bg-blue-200"
                                    : " bg-colorIconGray hover:bg-blue-200 cursor-pointer"
                                }
                              >
                                <td className=" whitespace-nowrap p-2 font-medium">
                                  {batch.title}
                                </td>
                                <td className=" whitespace-nowrap p-2 font-medium">
                                  {batch.description.substring(0, 100)}
                                </td>
                                <td className=" whitespace-nowrap p-2 font-medium">
                                  {batch.arrived_at}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
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
                    {batch.previous !== null && (
                      <button
                        onClick={() => handleClick({ link: batch.previous })}
                        className="h-10 px-5 text-indigo-600 transition-colors duration-150 bg-white rounded-l-lg focus:shadow-outline hover:bg-indigo-100"
                      >
                        {paginationContext.prev}
                      </button>
                    )}
                  </li>

                  <button className="h-10 px-5 text-indigo-600 transition-colors duration-150 bg-white focus:shadow-outline hover:bg-indigo-100">
                    {batch.count}
                  </button>

                  <li>
                    {batch.next !== null && (
                      <button
                        onClick={() => handleClick({ link: batch.next })}
                        className="h-10 px-5 text-indigo-600 transition-colors duration-150 bg-white rounded-l-lg focus:shadow-outline hover:bg-indigo-100"
                      >
                        {paginationContext.next}
                      </button>
                    )}
                  </li>
                </ul>
              </nav>
            </>
          )}
        </section>
      )}

      {views.name === "new" && <BatchNew />}
    </>
  );

  return content;
};

export default Batch;
