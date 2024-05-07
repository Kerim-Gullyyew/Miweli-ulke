import React from "react";

const T_header = ({data}) => {
  return (
    <th scope="col" className="border px-6 py-2">
      {data}
    </th>
  );
};

export default T_header;
