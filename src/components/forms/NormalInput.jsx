/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";

export default function NormalInput({ ...props }) {
  const [value, setValue] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
    props.updated(event.target.value);
  };
  useEffect(() => {
      setValue(props.value);
    }, [props.value]);
  return (
    <div>
      {props.children ? (
        <label
          htmlFor={props.id}
          className="text-neutral-600 font-medium text-sm"
        >
          {props.children}
        </label>
      ) : (
        null
      )}
      <input
        type={props.type}
        value={value}
        onChange={handleChange}
        placeholder={props.placeholder}
        name={props.name}
        disabled={props.isDisabled ? 'disabled' : null}
        className={`${props.size} h-10 mt-1 rounded-lg bg-[#F9F9FC] border border-neutral-100 text-neutral-400 font-normal text-sm px-3 py-2 placeholder:text-neutral-400 focus:outline-none`}
      />
      {/* {props.error && <div className="error-message">{props.error}</div>} */}
    </div>
  );
}
