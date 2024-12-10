/* eslint-disable react/prop-types */
import React, { useState } from "react";
import HeaderIcon from "../icons/HeaderIcon.jsx";

export default function FileUploader({ ...props }) {
  const [value, setValue] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  //
  return (
    <div
      className={`rounded-lg p-6 ${props.size} ${props.color} ${props.border} ${props.text} `}
    >
      <div className="w-full ">
        {props.children ? (
          <label htmlFor={props.id} className="">{props.children}</label>
        ) : (
          <></>
        )}
        <div className="pt-[14px]">
          <div>
            {props.label ? (
              <label htmlFor={props.id} className={props.labelText}>
                {props.label}
              </label>
            ) : (
              <></>
            )}
          </div>

          {/* {props.icon &&
          <HeaderIcon item={props.icon} styling={`mr-1 ${props.iconStyle}`} />
        } */}
          {/* <div className="relative bg-[#F9F9FC] min-w-[216px] max-w-[216px] min-h-[204px] max-h-[204px] mt-1"> */}
          <textarea
            type={props.type}
            value={value}
            onChange={handleChange}
            placeholder={props.placeholder}
            name={props.name}
            rows="8"
            className={`text-neutral-400 font-normal text-sm p-3 ${props.placeholderText} bg-[#F9F9FC] w-full h-full mt-1 focus:outline-none text-wrap`}
          />
          {/* </div> */}
        </div>
      </div>

      {/* {props.error && <div className="error-message">{props.error}</div>} */}
    </div>
  );
}
