/* eslint-disable react/prop-types */
import React from "react";
import HeaderIcon from "../icons/HeaderIcon";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function NormalButton({ ...props }) {
  // style: pass in an object with styles will applied to the button
  // onClick: takes a function will be called when the button is clicked
  //
  const isDisabled = props.loading || props.isDisabled; 
  return (
    <button
      onClick={props.onClick}
      className={`flex justify-center gap-1 items-center rounded-lg py-[10px] px-[14px] font-semibold text-sm 
      ${props.color} ${props.text} ${props.border} ${isDisabled ? 'opacity-50':''}`}
      type={props.type}
      disabled={props.loading || props.isDisabled}
    >
      {/* text displayed on the button */}

      {props.loading ? 
      <HeaderIcon item={<AiOutlineLoading3Quarters />} styling={`${props.iconStyle}` } /> 
      : 
      <>
      {props.icon ? (
        <HeaderIcon item={props.icon} styling={`${props.iconStyle}` } />
      ) : (
        <></>
      )}
      </>}
      
      {props.children || null}
    </button>
  );
}
