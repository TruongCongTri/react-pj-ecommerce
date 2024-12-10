import React from "react";
import { IconContext } from "react-icons";

export default function SidebarIcon({ item = {}, styling = {} }) {
  return (
    <IconContext.Provider value={{ className: `${styling}` }}>
      <div>{item.icon || <div className="size-[18px] m-[3px]"></div>}</div>
    </IconContext.Provider>
  );
}
