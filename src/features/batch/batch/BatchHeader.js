import React from "react";
import { FaPlus } from "react-icons/fa";

const BatchHeader = ({name}) => {
  return (
    <>
      <div className="text-center flex bg-colorSecondaryBorder items-center rounded-t-xl py-2">
        <div className="font-bold font-poppins text-lg grow">{name}</div>
        
        <div className="mr-10 flex items-center p-1 cursor-pointer bg-blue-600 text-white  text-lg font-bold font-poppins text-center rounded-lg">
          <FaPlus />
     
        </div>
      </div>
      <hr className="border border-colorBorder" />
    </>
  );
};

export default BatchHeader;
