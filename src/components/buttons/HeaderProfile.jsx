import React, { useState, useEffect } from "react";

import StatusCircle from "../icons/StatusCircle";
import ProfileDropdown from "./ProfileDropdown";
import HeaderIcon from "../icons/HeaderIcon";

import { HiChevronDown } from "react-icons/hi2";
import { HiChevronUp } from "react-icons/hi2";

export default function HeaderProfile({ user = {} }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-l relative">
      <div className="flex gap-3 justify-between pl-4 items-center ">
        <div className="relative size-8">
          <img
            src={user.avatar}
            className="bg-[#E0E2E7] object-fit rounded-full custom-position"
          />
          <StatusCircle status={user.status} />
        </div>

        <div className="items-center text-start max-w-[102px] min-w-[102px] min-h-[40px] min-h-[40px]">
          <p className="font-medium text-sm text-neutral-800 truncate">
            {user.fullName}
          </p>
          <p className="font-medium text-xs text-neutral-500 truncate">
            {user.role.name}
          </p>
        </div>
        <div
          className={`rounded-r-lg min-h-[40px] min-h-[40px] flex flex-col justify-center 
          ${
            isOpen
              ? " bg-indigo-400/50 text-indigo-500"
              : " bg-white text-neutral-500 hover:bg-neutral-200 "
          }`}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {isOpen ? (
            <HeaderIcon item={<HiChevronUp />} styling={" m-1 size-6 "} />
          ) : (
            <HeaderIcon item={<HiChevronDown />} styling={" m-1 size-6 "} />
          )}
        </div>

        <ProfileDropdown item={isOpen} />
      </div>
    </div>
  );
}
