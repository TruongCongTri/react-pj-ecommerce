import React, { useState, useContext } from "react";

import { NotiContext } from "../../contexts/NotiContext";

import NotiDropdown from "./NotiDropdown";
import HeaderIcon from "../icons/HeaderIcon";
import RedQuantityCircle from "../icons/RedQuantityCircle";

export default function HeaderNoti({ item = {}, styling = {}}) {
  const { isOpen, setIsOpen, closeNoti } = useContext(NotiContext);

  return (
    <>
      <div className="relative">
        <div
          onClick={() => {
            if (isOpen === `${item.name}`) {
              setIsOpen(null);
            } else {
              setIsOpen(`${item.name}`);
            }
          }}
          className={`flex relative justify-center hover:text-indigo-200 cursor-pointer
        ${
          isOpen === `${item.name}` ? " text-indigo-500 " : " text-neutral-500"
        }`}
        >
          <HeaderIcon item={item.icon} styling={styling} />
          <RedQuantityCircle
            item={item.notis}
            position={"absolute"}
            style={`object-right-top -mr-6 -mt-[9px]`}
          />
        </div>

        <>{item.isNoti ? <NotiDropdown item={item} /> : <></>}</>
      </div>
    </>
  );
}
