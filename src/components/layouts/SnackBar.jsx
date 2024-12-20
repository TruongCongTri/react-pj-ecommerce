import React, { useContext } from "react";
import { SnackBarContext } from "../../contexts/SnackBarContext";

import { HiMiniCheckCircle } from "react-icons/hi2";
import { HiMiniExclamationCircle } from "react-icons/hi2";
import { HiMiniExclamationTriangle } from "react-icons/hi2";
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";
import { HiMiniInformationCircle } from "react-icons/hi2";

import { HiMiniXMark } from "react-icons/hi2";

import HeaderIcon from "../../components/icons/HeaderIcon";

export default function SnackBar() {
  const {snacks, removeSnack} = useContext(SnackBarContext);
  
  const getColorByStatus = (status) => {
    switch (status) {
      case "info":
        return {
          icon: <HiMiniInformationCircle />,
          boxStyle: "text-blue-800 bg-blue-50 border-blue-200 ",
          closeBtnStyle:
            "bg-blue-50 text-blue-500 focus:ring-blue-400 hover:bg-blue-200",
        };
      case "error":
        return {
          icon: <HiMiniExclamationCircle />,
          boxStyle: "text-red-800 bg-red-50 border-red-200 ",
          closeBtnStyle:
            "bg-red-50 text-red-500 focus:ring-red-400 hover:bg-red-200",
        };
      case "warning":
        return {
          icon: <HiMiniExclamationTriangle />,
          boxStyle: "text-yellow-800 bg-yellow-50 border-yellow-200 ",
          closeBtnStyle:
            "bg-yellow-50 text-yellow-500 focus:ring-yellow-400 hover:bg-yellow-200",
        };
      case "success":
        return {
          icon: <HiMiniCheckCircle />,
          boxStyle: "text-green-800 bg-green-50 border-green-200 ",
          closeBtnStyle:
            "bg-green-50 text-green-500 focus:ring-green-400 hover:bg-green-200",
        };
      case "question":
        return {
          icon: <HiMiniQuestionMarkCircle />,
          boxStyle: "text-gray-800 bg-gray-50 border-gray-200 ",
          closeBtnStyle:
            "bg-gray-50 text-gray-500 focus:ring-gray-400 hover:bg-gray-200",
        };
      default:
        return {
          icon: <HiMiniInformationCircle />,
          boxStyle: "text-blue-800 bg-blue-50 border-blue-200 ",
          closeBtnStyle:
            "bg-blue-50 text-blue-500 focus:ring-blue-400 hover:bg-blue-200",
        };
    }
  };
  
  return (
    <>
      <div className="fixed flex flex-col gap-2 bottom-4 right-6">
        {snacks.map((snack) => (
          <div
            key={snack.id}
            id="snackbar"
            className={`
            ${getColorByStatus(snack.type).boxStyle}
            flex justify-between items-center border rounded-lg py-[10px] px-[14px]`}
          >
            <HeaderIcon
              item={getColorByStatus(snack.type).icon}
              styling={" size-5 "}
            />
            <span className="sr-only">Info</span>
            <div className="ms-3 font-semibold text-sm">{snack.content}</div>
            <button
              type="button"
              className={` 
              ${getColorByStatus(snack.type).closeBtnStyle}
              ms-3 rounded-lg focus:ring-2 inline-flex items-center justify-center`}
                onClick={() => {removeSnack(snack.id)}}
            >
              <HeaderIcon item={<HiMiniXMark />} styling={" size-5 "} />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
