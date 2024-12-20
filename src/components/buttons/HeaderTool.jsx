import React, { useState } from 'react'

import { IconContext } from "react-icons";

import HeaderIcon from "../icons/HeaderIcon";
import RedQuantityCircle from "../icons/RedQuantityCircle";

export default function HeaderTool({ item = {}, styling = {} }) {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="relative">
        <div
          className={`flex relative justify-center hover:text-indigo-200 cursor-pointer
        ${isOpen ? " text-indigo-500 " : " text-neutral-500"}`}
        >
          <HeaderIcon item={item.icon} styling={styling} />
          <RedQuantityCircle item={item.notis} position={'absolute'} style={`object-right-top -mr-6 -mt-[9px]`} />
        </div>

      </div>

    </>
  )
}
