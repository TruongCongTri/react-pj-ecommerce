import React from "react";
import { HiMiniBars3 } from "react-icons/hi2";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { HiOutlineCalendar } from "react-icons/hi2";
import { HiOutlineBell } from "react-icons/hi2";
import { HiOutlineEnvelope } from "react-icons/hi2";
import HeaderProfile from "../../buttons/HeaderProfile";
import HeaderNoti from "../../buttons/HeaderNoti";
import HeaderTool from "../../buttons/HeaderTool";
import HeaderIcon from "../../icons/HeaderIcon";

export default function Header() {
  const user = {
    id: 1,
    fullName: "Truong Cong Tri",
    role: {
      id: 1,
      name: "Manager",
    },
    avatar: 'https://mantisdashboard.io/free/assets/avatar-1-B0hIH1z9.png',
    status: {
      id: 1,
      name: 'Active',
    }
  };

  const listNoti = [
    {
      id: 1,
      name: "magnify glass",
      icon: <HiMagnifyingGlass />,
      isNoti: false,
    },
    {
      id: 2,
      name: "calendar",
      icon: <HiOutlineCalendar />,
      isNoti: false,
    },
    {
      id: 3,
      name: "bell",
      icon: <HiOutlineBell />,
      isNoti: true,
      notis: {
        qtt: 3,
      }
    },
    {
      id: 4,
      name: "envelope",
      icon: <HiOutlineEnvelope />,
      isNoti: true,
      notis: {
        qtt: 64,
      }
    },
    {
      id: 5,
      name: "",
      icon: "",
      isNoti: true,
      notis: {
        qtt: 0,
      }
    },
  ];

  return (
    <div className="min-h-[72px] max-h-[72px] border-b-[1px] flex justify-between items-center px-6 py-4 bg-white">
      <button className="hover:text-gray-500">
        <HeaderIcon item={<HiMiniBars3 />} styling={' size-6 '} />
      </button>

      <div className="flex gap-x-4 ">
        <div className="flex gap-x-4 items-center">

          {listNoti.map((item) => {
            return item.isNoti ? (
              <HeaderNoti key={item.id} item={item} styling={' size-6 m-2 '}/>
            ) : (
              <HeaderTool key={item.id} item={item} styling={' size-6 m-2 '}/>
            );
          })}
        </div>

        {/* profile button */}
        <HeaderProfile user={user} />
      </div>
    </div>
  );
}