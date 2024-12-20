import React from "react";
import { IconContext } from "react-icons";

import { HiOutlineQuestionMarkCircle } from "react-icons/hi2";

export default function IconWithCircleBackground({
  item = {},
  styling = {},
  outline = {},
}) {
  return (
    <div
      className={`rounded-full min-w-10 max-w-10 min-h-10 max-h-10 border-[4px] ${outline} flex items-center justify-center`}
    >
      <IconContext.Provider value={{ className: `${styling}` }}>
        {item || <HiOutlineQuestionMarkCircle />}
      </IconContext.Provider>
    </div>
  );
}
