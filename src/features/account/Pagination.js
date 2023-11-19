import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { limit } from "../../rootUrl";
import {
  faArrowCircleLeft,
  faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { getOrderInfo } from "../../store/features/auth/authSlice";
const Pagination = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.auth);
  const next = orders?.next;
  const count = orders?.count;
  const previous = orders?.previous;
  const nextLink = next?.split("/");
  const previousLink = previous?.split("/");
  const lang = localStorage.getItem("userLanuage");
  return (
    <div>
      <div className=" mt-5 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              {previous !== null && previous !== undefined ? (
                  <div onClick={() => dispatch(getOrderInfo({url:previousLink[6], token}))} className="border border-primary text-2xl shadow-lg w-10 h-9 flex items-center justify-center text-white bg-primary rounded cursor-pointer">
                    <FontAwesomeIcon icon={faArrowCircleLeft} />
                  </div>
              ) : (
                " "
              )}
              <div className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                {Math.ceil(count / limit)} {lang === 'tm' ? "sahypalar" : "страницы"}
              </div>
              {next !== null && next !== undefined ? (
                  <div onClick={() => dispatch(getOrderInfo({url:nextLink[6], token}))} className="border border-primary text-2xl shadow-lg w-10 h-9 flex items-center justify-center text-white bg-primary rounded cursor-pointer">
                    <FontAwesomeIcon icon={faArrowCircleRight} />
                  </div>
              ) : (
                " "
              )}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Pagination;
