/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import HeaderIcon from "../icons/HeaderIcon";

export default function LinkButton({ ...props }) {
  return (
    <Link
      to={props.link}
      className={`flex justify-center items-center rounded-lg py-[10px] px-[14px] ${props.color} ${props.text} ${props.border}`}
    >
      {/* text displayed on the button */}
      {props.icon ? (
        <HeaderIcon item={props.icon} styling={`mr-1 ${props.iconStyle}`} />
      ) : (
        <></>
      )}
      {props.children}
    </Link>
  );
}
