import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { ImEye } from "react-icons/im";
import isOdd from "../utils/isOdd";

import { useNavigate } from "react-router-dom";
import { getmove } from "../features/move/moveSlice";
import { MoveContext } from "../features/move/MoveContext";
import MoveNew from "../features/move/component/MoveNew";
import MoveEdit from "../features/move/component/MoveEdit";
import MoveDelete from "../features/move/component/MoveDelete";
import { paginationContext } from "../components/table/tableContext";
const Move = () => {
  const { token } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  useEffect(() => {
    let isCancelled = false;
    dispatch(getmove({ token }))
      .unwrap()
      .catch((err) => SetError(err));
    return () => {
      isCancelled = true;
    };
  }, [dispatch, token]);

  const move = useSelector((state) => state.move);
  const [error, SetError] = useState("");
  const navigate = useNavigate();

  function handleClick({ link }) {
    try {
      dispatch(getmove({ token, link }))
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
          <MoveNew />
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
                        {MoveContext.out_cell}
                      </th>
                      <th scope="col" className=" px-6 py-2">
                        {MoveContext.in_cell}
                      </th>
                      <th scope="col" className=" px-6 py-2">
                        {MoveContext.username}
                      </th>
                      <th scope="col" className=" px-6 py-2">
                        {MoveContext.created_at}
                      </th>
                      <th scope="col" className=" px-6 py-2">
                        {MoveContext.updated_at}
                      </th>
                      <th scope="col" className=" px-6 py-2">
                        {MoveContext.action}
                      </th>

                      {/* <th scope="col" className=" px-6 py-2">
                        {MoveContext.action}
                      </th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {move?.results?.map((move, key) => (
                      <tr
                        key={key}
                        // onClick={() => navigate("/move/" + move.id)}
                        // onClick={navigateBatchDetail(batch?.id)}
                        className={
                          isOdd(key)
                            ? " bg-white cursor-pointer hover:bg-blue-200"
                            : " bg-colorIconGray hover:bg-blue-200 cursor-pointer"
                        }
                      >
                        <td className=" whitespace-nowrap p-2 font-medium">
                          {move.out_cell.code}
                        </td>
                        <td className=" whitespace-nowrap p-2 font-medium">
                          {move.in_cell.code}
                        </td>
                        <td className=" whitespace-nowrap p-2 font-medium">
                          {move.user.username}
                        </td>

                        <td className=" whitespace-nowrap p-2 font-medium">
                          {move.created_at}
                        </td>

                        <td className=" whitespace-nowrap p-2 font-medium">
                          {move.updated_at}
                        </td>

                        <td className=" flex justify-center space-x-3 p-2 whitespace-nowrap font-medium">
                          <ImEye
                            onClick={() => navigate("/move/" + move.id)}
                            size={20}
                            className=" text-green-600 cursor-pointer hover:text-colorBlue"
                          />
                          <MoveEdit moveDetail1={move} />
                          <MoveDelete moveDetail1={move} />
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
            {move.previous !== null && (
              <button
                onClick={() => handleClick({ link: move.previous })}
                className="h-10 px-5 text-indigo-600 transition-colors duration-150 bg-white rounded-l-lg focus:shadow-outline hover:bg-indigo-100"
              >
                {paginationContext.prev}
              </button>
            )}
          </li>

          <button className="h-10 px-5 text-indigo-600 transition-colors duration-150 bg-white focus:shadow-outline hover:bg-indigo-100">
            {move.count}
          </button>

          <li>
            {move.next !== null && (
              <button
                onClick={() => handleClick({ link: move.next })}
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

export default Move;
