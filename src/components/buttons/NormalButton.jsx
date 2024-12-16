/* eslint-disable react/prop-types */
import React from "react";
import HeaderIcon from "../icons/HeaderIcon";

export default function NormalButton({ ...props }) {
  // style: pass in an object with styles will applied to the button
  // onClick: takes a function will be called when the button is clicked
  //

  return (
    <button
      onClick={props.onClick}
      className={`flex justify-center items-center rounded-lg py-[10px] px-[14px] font-semibold text-sm 
      ${props.color} ${props.text} ${props.border}`}
      type={props.type}
      disabled={props.isDisabled}
    >
      {/* text displayed on the button */}
      {props.icon ? (
        <HeaderIcon item={props.icon} styling={`mr-1 ${props.iconStyle}`} />
      ) : (
        <></>
      )}
      {props.children}
    </button>
  );
}
