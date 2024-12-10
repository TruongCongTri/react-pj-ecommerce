import React, { useState } from "react";
import NavIcon from "../icons/NavIcon";
import NavItem from "./NavItem";
import { HiChevronDown } from "react-icons/hi2";
import { HiChevronUp } from "react-icons/hi2";

export default function GroupNavItem({ item = {} }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className={`flex mb-2 items-center justify-between rounded-lg py-2 px-3 w-full  
        ${
          isOpen
            ? " bg-indigo-400/50 text-indigo-500 "
            : " bg-white text-neutral-500 hover:bg-neutral-200 "
        }`}
      >
        <div className="flex">
          <NavIcon item={item} styling={" size-[24px] "} />
          <span className="ml-2 font-bold text-sm">{item.name}</span>
        </div>

        {isOpen ? (
          <HiChevronUp className="size-[24px]" />
        ) : (
          <HiChevronDown className="size-[24px]" />
          
        )}
      </div>
      <div className={isOpen ? "" : " hidden"}>
        <div className="rounded-lg">
          {item.childs.map((child) => {
            return <NavItem key={child.id} item={child} />;
          })}
        </div>
      </div>
    </div>
  );
}
