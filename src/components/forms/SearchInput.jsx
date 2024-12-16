/* eslint-disable react/prop-types */
import React, { useState } from "react";
import HeaderIcon from "../icons/HeaderIcon.jsx";

export default function SearchInput({ ...props }) {
  const [value, setValue] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  //
  return (
    <div className={`flex items-center rounded-lg min-h-10 max-h-10 ${props.size} bg-white border`}>
      <div className="flex w-full px-3 py-2">
        {/* {props.label ? <label htmlFor={props.id}>{props.label}</label> : <></>}  */}
        {props.icon &&
          <HeaderIcon item={props.icon} styling={`mr-1 size-5 text-neutral-500`} />
        }
        <input
          type="text"
          value={props.query}
          onChange={() => {
            props.handleChange();
          }}
          placeholder={props.placeholder}
          name={props.name}
          className={`text-neutral-400 font-normal text-sm placeholder:text-neutral-400 w-full focus:outline-none`}


        />
      </div>

      {/* {props.error && <div className="error-message">{props.error}</div>} */}
    </div>
  );
}
