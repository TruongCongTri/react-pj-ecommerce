import React, {useContext} from "react";
import { SnackBarContext } from "../../contexts/SnackBarContext";


import { HiMiniCheckCircle } from "react-icons/hi2";
import { HiMiniExclamationCircle } from "react-icons/hi2";
import { HiMiniExclamationTriangle } from "react-icons/hi2";
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";
import { HiMiniInformationCircle } from "react-icons/hi2";

import { HiMiniXMark } from "react-icons/hi2";

import HeaderIcon from "../icons/HeaderIcon";

export default function Alert() {
  const {snacks, removeSnack} = useContext(SnackBarContext);

  const getColorByStatus = (status) => {
    switch (status) {
      case "info":
        return {
          icon: <HiMiniInformationCircle />,
          style: "text-blue-800 bg-blue-50 border-blue-200 ",
          closeBtnStyle:
            "bg-blue-50 text-blue-500 focus:ring-blue-400 hover:bg-blue-200",
        };
      case "errors":
        return {
          icon: <HiMiniExclamationCircle />,
          style: "text-red-800 bg-red-50 border-red-200 ",
          closeBtnStyle:
            "bg-red-50 text-red-500 focus:ring-red-400 hover:bg-red-200",
        };
      case "warning":
        return {
          icon: <HiMiniExclamationTriangle />,
          style: "text-yellow-800 bg-yellow-50 border-yellow-200 ",
          closeBtnStyle:
            "bg-yellow-50 text-yellow-500 focus:ring-yellow-400 hover:bg-yellow-200",
        };
      case "success":
        return {
          icon: <HiMiniCheckCircle />,
          style: "text-green-800 bg-green-50 border-green-200 ",
          closeBtnStyle:
            "bg-green-50 text-green-500 focus:ring-green-400 hover:bg-green-200",
        };
      case "question":
        return {
          icon: <HiMiniQuestionMarkCircle />,
          style: "text-gray-800 bg-gray-50 border-gray-200 ",
          closeBtnStyle:
            "bg-gray-50 text-gray-500 focus:ring-gray-400 hover:bg-gray-200",
        };
      default:
        break;
    }
  };
  // ${getColorByStatus(snack.type).style} 
  // item={getColorByStatus(snack.type).icon}
  //${getColorByStatus(snack.type).closeBtnStyle}
  return (
    <>
      <div className="fixed flex flex-col gap-2 bottom-4 right-4">
        {snacks.map((snack) => (
          <div
            key={snack}
            id="snackbar"
            className={`
            
            flex justify-between items-center p-4 border-2 rounded-lg`}
          >
            <HeaderIcon
              icon={<HiMiniQuestionMarkCircle />}
              styling={" size-6 "}
            />
            <span className="sr-only">Info</span>
            <div className="ms-3 text-sm font-medium">{snack.content}</div>
            <button
              type="button"
              className={` ms-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 p-1.5 inline-flex items-center justify-center h-8 w-8`}
               onClick={() => {removeSnack(snack.id)}}
            >
              <HeaderIcon item={<HiMiniXMark />} styling={" size-6 "} />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
