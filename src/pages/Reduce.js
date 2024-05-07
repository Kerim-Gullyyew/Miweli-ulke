import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { ImEye } from "react-icons/im";
import isOdd from "../utils/isOdd";
import {  useNavigate } from "react-router-dom";
import { getreduce } from "../features/reduce/reduceSlice";
import { ReduceContext } from "../features/reduce/ReduceContext";
import { backendUrl } from "../data/ConstTexts";
import ReduceNew from "../features/reduce/component/ReduceNew";
import ReduceEdit from "../features/reduce/component/ReduceEdit";
import { paginationContext } from "../components/table/tableContext";
import ReduceDelete from "../features/reduce/component/ReduceDelete";

const Reduce = () => {
    const { token } = useSelector((state) => state.login);
    const dispatch = useDispatch();
    useEffect(() => {
      let isCancelled = false;
      dispatch(getreduce({ token }))
        .unwrap()
        .catch((err) => SetError(err));
      return () => {
        isCancelled = true;
      };
    }, [dispatch, token]);
  
    const reduce = useSelector((state) => state.reduce);
    const [error, SetError] = useState("");
    const navigate = useNavigate();
  

    function handleClick({ link }) {
      try {
        dispatch(getreduce({ token, link }))
          .unwrap()
          .then((res) => {});
      } catch (err) {
        SetError(err);
      }
      return () => {};
    }

  
    let content = (
      <section className="bg-white rounded-lg hover:shadow">
        <p className="text-center text-lg font-bold font-poppins text-red-600">
          {error?.detail}
        </p>
        <div className="text-center flex bg-colorSecondaryBorder items-center rounded-t-xl py-2">
          <div className="font-bold font-poppins text-lg grow">Üýtgetmek</div>
  
          <div className="mr-10 flex items-center p-1 cursor-pointer  text-white  text-lg font-bold font-poppins text-center rounded-lg">
            <ReduceNew />
          </div>
        </div>
        <hr className="border border-colorBorder" />
  
        <div className="w-full">
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="inline-block overflow-x-auto min-w-full p-2">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left text-sm font-light">
                    <thead className="font-medium">
                      <tr className=" bg-blue-50 text-colorTextDarkBlue">
                        <th scope="col" className=" px-6 py-2">
                          {ReduceContext.image}
                        </th>
                        <th scope="col" className=" px-6 py-2">
                          {ReduceContext.price}
                        </th>
                        <th scope="col" className=" px-6 py-2">
                          {ReduceContext.amount}
                        </th>
                        <th scope="col" className=" px-6 py-2">
                          {ReduceContext.reason}
                        </th>
                        <th scope="col" className=" px-6 py-2">
                          {ReduceContext.description}
                        </th>
                        <th scope="col" className=" px-6 py-2">
                          {ReduceContext.created_at}
                        </th>
                        <th scope="col" className=" px-6 py-2">
                          {ReduceContext.updated_at}
                        </th>
                        <th scope="col" className=" px-6 py-2">
                          {ReduceContext.action}
                        </th>
  
                      </tr>
                    </thead>
                    <tbody>
                      {reduce?.results?.map((reduce, key) => (
                        <tr
                          key={key}
                          className={
                            isOdd(key)
                              ? " bg-white cursor-pointer hover:bg-blue-200"
                              : " bg-colorIconGray hover:bg-blue-200 cursor-pointer"
                          }
                        >
                          <td className=" whitespace-nowrap p-2 font-medium">
                            <img className="w-10 h-10 object-contain" src={backendUrl + reduce.image} alt="img" />
                          </td>
                          <td className=" whitespace-nowrap p-2 font-medium">
                            {reduce.price}
                          </td>
                          <td className=" whitespace-nowrap p-2 font-medium">
                            {reduce.amount}
                          </td>
                          <td className=" whitespace-nowrap p-2 font-medium">
                            {reduce.reason}
                          </td>
                          <td className=" whitespace-nowrap p-2 font-medium">
                            {reduce.description}
                          </td>
  
                          <td className=" whitespace-nowrap p-2 font-medium">
                            {reduce.created_at}
                          </td>
  
                          <td className=" whitespace-nowrap p-2 font-medium">
                            {reduce.updated_at}
                          </td>
  
                          <td className=" flex items-center justify-center space-x-3 p-2 whitespace-nowrap font-medium">
                            <ImEye
                              onClick={() => navigate("/reduce/" + reduce.id)}
                              size={20}
                              className=" text-green-600 cursor-pointer hover:text-colorBlue"
                            />
                            <ReduceEdit reduceDetail1={reduce} />
                            <ReduceDelete reduceDetail1={reduce} />
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
                {reduce.previous !== null && (
                  <button
                    onClick={() => handleClick({ link: reduce.previous })}
                    className="h-10 px-5 text-indigo-600 transition-colors duration-150 bg-white rounded-l-lg focus:shadow-outline hover:bg-indigo-100"
                  >
                    {paginationContext.prev}
                  </button>
                )}
              </li>

              <button className="h-10 px-5 text-indigo-600 transition-colors duration-150 bg-white focus:shadow-outline hover:bg-indigo-100">
                {reduce.count}
              </button>

              <li>
                {reduce.next !== null && (
                  <button
                    onClick={() => handleClick({ link: reduce.next })}
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
  return content
}

export default Reduce