/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'

export default function NormalTextarea({ ...props }) {
  const [value, setValue] = useState('');
	const handleChange = event => {
		setValue(event.target.value);
		props.updated(event.target.value);
	};
  useEffect(() => {
        setValue(props.value);
      }, [props.value]);
  return (
    <div>
      {props.children ? (
        <label htmlFor={props.id} 
        className="text-neutral-600 font-medium text-sm"
        >
          {props.children || null}
        </label>
      ) : (
        null
      )}
        <textarea 
        ref={props.reference}
          type={props.type}
          value={value || ""}
          onChange={handleChange}
          placeholder={props.placeholder}
          name={props.name}
          rows={props.rows}
          disabled={props.isDisabled ? 'disabled' : null}
          className={`${props.size}  mt-1 rounded-lg bg-[#F9F9FC] border border-neutral-100 text-neutral-600 font-normal text-sm px-3 py-2 placeholder:text-neutral-400 focus:outline-none`}
        />
      {/* {props.error && <div className="error-message">{props.error}</div>} */}
    </div>
  )
}
