import React from "react";
import NavItem from "./NavItem";
import { HiOutlineCog8Tooth } from "react-icons/hi2";
import { LuUserRound } from "react-icons/lu";
import { HiOutlineArrowLeftStartOnRectangle } from "react-icons/hi2";


export default function ProfileDropdown({ item = {} }) {
  const listSetting = [
    {
      id: 1,
      name: "Profile",
      icon: <LuUserRound />,
      link: "/admin/profile",
      isGroup: false,
    },
    {
      id: 2,
      name: "Setting",
      icon: <HiOutlineCog8Tooth />,
      link: "/admin/setting",
      isGroup: false,
    },
  ];

  const listAuth = [
    {
      id: 1,
      name: "Logout",
      icon: <HiOutlineArrowLeftStartOnRectangle />,
      link: "/logout",
      isGroup: false,
    },
  ];

  return (
    <div
      className={`absolute min-w-[264px] max-w-[264px] px-[20px] 
      right-0 top-[64px] z-[1000] py-4  
      rounded-lg block shadow-lg bg-white 
        ${item ? " " : " hidden"}`}
    >
      <div className="pb-4">
        {listSetting.map((item) => {
          return <NavItem key={item.id} item={item} />;
        })}
      </div>

      <div className="border-t pt-4">
        {listAuth.map((item) => {
          return <NavItem key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
}
