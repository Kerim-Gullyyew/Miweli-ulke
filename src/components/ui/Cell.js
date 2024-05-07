import React from "react";
import { useEffect } from "react";

import {
  Ripple,
  initTE,
} from "tw-elements";


const Cell = ({ bgcolor, tooltip_title }) => {
  useEffect(() => {
    initTE({ Ripple });
  }, [])
  return (
    
    <div className={`group relative rounded-full w-10 h-10 `+ bgcolor}>
      <span className="pointer-events-none bg-colorTableBlack rounded-lg text-white absolute z-20 -top-1 left-0 w-auto opacity-0 transition-opacity group-hover:opacity-100">
        {tooltip_title}
      </span>
    </div>
  );
};

export default Cell;
