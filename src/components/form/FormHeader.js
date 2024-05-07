import React from "react";

const FormHeader = ({name}) => {
  return (
    <>
      <div className="text-center flex bg-colorSecondaryBorder items-center rounded-t-xl py-2">
        <div className="font-bold font-poppins text-lg grow">{name}</div>
        <div className="mr-10 px-3 border-2 border-colorBlue text-lg font-bold font-poppins bg-white text-center rounded-full shadow-lg">
          Yza dolanmak
        </div>
      </div>
      <hr className="border border-colorBorder" />
    </>
  );
};

export default FormHeader;
