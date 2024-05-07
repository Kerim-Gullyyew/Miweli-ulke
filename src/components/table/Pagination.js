import React from "react";
import { paginationContext } from "./tableContext";
const Pagination = ({count}) => {
  let content = (
    <nav aria-label="Page navigation" className="flex justify-end xs:pr-5 pb-3">
      <ul className="inline-flex">
        <li>
          <button className="h-10 px-5 text-indigo-600 transition-colors duration-150 bg-white rounded-l-lg focus:shadow-outline hover:bg-indigo-100">
          {paginationContext.prev}
          </button>
        </li>
        <li>
          <button className="h-10 px-5 text-white transition-colors duration-150 bg-indigo-600 focus:shadow-outline">
            1
          </button>
        </li>
        <li>
          <button className="h-10 px-5 text-indigo-600 transition-colors duration-150 bg-white focus:shadow-outline hover:bg-indigo-100">
            {count}
          </button>
        </li>
        <li>
          <button className="h-10 px-5 text-indigo-600 transition-colors duration-150 bg-white focus:shadow-outline hover:bg-indigo-100">
            3
          </button>
        </li>
        <li>
          <button className="h-10 px-5 text-indigo-600 transition-colors duration-150 bg-white rounded-r-lg focus:shadow-outline hover:bg-indigo-100">
            {paginationContext.next}
          </button>

        </li>
      </ul>
    </nav>
  );
  return content;
};

export default Pagination;
