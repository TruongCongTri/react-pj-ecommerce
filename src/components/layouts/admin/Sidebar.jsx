import React from "react";

import Dashlab from "../../../assets/image/dashboard-logo.svg";

import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { LuUsersRound } from "react-icons/lu";
import { TbBuildingStore } from "react-icons/tb";
import { RiLineChartLine } from "react-icons/ri";
import { RiHeadphoneLine } from "react-icons/ri";
import { HiOutlineCog8Tooth } from "react-icons/hi2";

import NavItem from "../../buttons/NavItem";
import GroupNavItem from "../../buttons/GroupNavItem";

export default function Sidebar() {
  const listNavigator = [
    {
      id: 1,
      name: "Dashboard",
      icon: <HiOutlineSquares2X2 />,
      link: "/admin",
      isGroup: false,
    },
    {
      id: 2,
      name: "Products",
      icon: <HiOutlineShoppingBag />,
      isGroup: true,
      childs: [
        {
          id: "p1",
          name: "Product List",
          link: "/admin/products",
          isGroup: false,
        },
        {
          id: "p2",
          name: "Categories",
          link: "/admin/categories",
          isGroup: false,
        },
      ],
    },
    {
      id: 3,
      name: "Orders",
      icon: <HiOutlineShoppingCart />,
      link: "/admin/orders",
      isGroup: false,
      notis: {
        qtt: 2,
      }
    },
    {
      id: 4,
      name: "Customers",
      icon: <LuUsersRound />,
      link: "/admin/customers",
      isGroup: false,
    },
    {
      id: 5,
      name: "Seller",
      icon: <TbBuildingStore />,
      link: "/admin/seller",
      isGroup: false,
    },
    {
      id: 6,
      name: "Analytics",
      icon: <RiLineChartLine />,
      link: "/admin/analytics",
      isGroup: false,
    },
    
  ];

  const listSetting = [
    {
      id: 1,
      name: "Support",
      icon: <RiHeadphoneLine />,
      link: "/admin/support",
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

  return (
    <div
      className="min-w-[264px] max-w-[264px] h-[100vh] px-[20px] 
      bg-white border-r-[1px] border-neutral-50 flex flex-col z-100 sticky top-0"
    >
      <div className="py-[15px]">
        <div className="flex items-center gap-x-3 w-full min-h-[49px] max-h-[49px] ">
          <img className="size-[34px]" src={Dashlab} />
          <div className="font-semibold text-2xl text-black-700">Dashlab</div>
        </div>
      </div>

      {/* nav icon */}
      <div className="py-[24px] flex flex-col justify-between h-full">
        <div className="pb-[24px]">
          {listNavigator.map((item) => {
            return item.isGroup ? (
              <GroupNavItem key={item.id} item={item} />
            ) : (
              <NavItem key={item.id} item={item} />
            );
          })}
        </div>
        
        <div className="">
          {listSetting.map((item) => {
            return <NavItem key={item.id} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
}
