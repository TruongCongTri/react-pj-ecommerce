import React from "react";
import { NavLink } from "react-router-dom";
import NavIcon from "../icons/NavIcon";

import RedQuantityCircle from "../icons/RedQuantityCircle";

export default function NavigateItem({ item = {} }) {
  return (
    <NavLink
      to={item.link}
      className={({ isActive }) =>
        "flex justify-between mb-2 items-center py-2 px-3 rounded-lg " +
        (isActive ? "bg-[#5C59E8] text-white" : "bg-white text-neutral-500")
      }
    >
      <div className="flex relative">
        <NavIcon item={item} styling={" size-[24px] "} />
        <span className="ml-2 font-bold text-sm">{item.name}</span>
      </div>
      <RedQuantityCircle item={item.notis} style={` flex items-center `} />
      
      {/* side bar icon */}
    </NavLink>
  );
}
