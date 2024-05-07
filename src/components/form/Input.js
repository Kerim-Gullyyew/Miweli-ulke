import React from "react";

const Input = ({ placeholder, value, onChange, type, htmlFor, className, accept }) => {
  return (
    <>
      <input
        value={value}
        onChange={onChange}
        autoComplete={htmlFor}
        className={className}
        id={htmlFor}
        type={type}
        accept={accept}
        placeholder={placeholder}
      />
    </>
  );
};

export default Input;
