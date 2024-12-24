import React, { useRef, useContext } from "react";
import NavItem from "./NavItem";
import { HiOutlineCog8Tooth } from "react-icons/hi2";
import { LuUserRound } from "react-icons/lu";
import { HiOutlineArrowLeftStartOnRectangle } from "react-icons/hi2";
import { SnackBarContext } from "../../contexts/SnackBarContext";

import { useNavigate } from "react-router-dom";
import NavIcon from "../icons/NavIcon";
import axios from "axios";
import apis from "../../apis";
export default function ProfileDropdown({ item = {} }) {
  const { addSnack } = useContext(SnackBarContext);

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
  const navigate = useNavigate();
  const logout = () => {
    apis.authorization.logout()
      .then(
        (res) => {
          // thành công
          addSnack("success", "Đăng xuất thành công");
        },
        (err) => {
          addSnack("error", err.response.data.message || "error");
          console.log(err);
        }
      )
      .catch((err) => {
        addSnack("error", JSON.stringify(err) || "error");
        console.log(err);
      });
    // axios.defaults.headers.post['Authorization'] = null;
    // localStorage.removeItem("user");
    // localStorage.removeItem("role");
    // localStorage.removeItem("authorization");
    // localStorage.removeItem("token");
    // navigate('/login')
  };
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
      {/* {listAuth.map((item) => {
          return <NavItem key={item.id} item={item} />;
        })} */}
        <button
          className="
            flex justify-between mb-2 items-center py-2 px-3 rounded-lg
            bg-white text-neutral-500"
          
          onClick={logout}
        >
          <div className="flex relative">
            <HiOutlineArrowLeftStartOnRectangle className=" size-[24px] " />
            <span className="ml-2 font-bold text-sm">Logout</span>
          </div>
        </button>
      </div>
    </div>
  );
}
