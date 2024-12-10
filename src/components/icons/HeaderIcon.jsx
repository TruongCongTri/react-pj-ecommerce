import React from "react";
import { IconContext } from "react-icons";

import { HiOutlineQuestionMarkCircle } from "react-icons/hi2";

export default function FileIcon({ item = {}, styling = {} }) {
  return (
    <IconContext.Provider value={{ className: `${styling}` }}>
      {item || <HiOutlineQuestionMarkCircle />}
    </IconContext.Provider>
  );
}
