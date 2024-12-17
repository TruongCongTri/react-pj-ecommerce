/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import HeaderIcon from "../icons/HeaderIcon";
import { HiChevronDown } from "react-icons/hi2";
import { HiChevronUp } from "react-icons/hi2";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { HiMiniXMark } from "react-icons/hi2";

export default function NormalDropdown({ ...props }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState({});

  const handleChange = (event) => {
    setSelected(event);
      props.updated(event.id);
    };
    useEffect(() => {
      setSelected(props.value);
      props.updated(props.value.id);
      }, [props.value]);

  return (
    <div>
      {props.children ? (
        <label className="text-neutral-600 font-medium text-sm">
          {props.children}
        </label>
      ) : null}

      <div className="relative flex flex-col items-center ">
        <div
          className="w-full h-10 mt-1 flex items-center justify-between rounded-lg bg-[#F9F9FC] border border-neutral-100 text-neutral-600 font-normal text-sm px-3 py-2 active:border-neutral-400 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selected?.id
            ? selected.name.length > 20
              ? selected.name.substring(0, 20) + "..."
              : selected.name
            : props.placeholder}
          {!isOpen ? (
            <HeaderIcon item={<HiChevronDown />} styling={`size-5`} />
          ) : (
            <HeaderIcon item={<HiChevronUp />} styling={`size-5`} />
          )}
        </div>

        {isOpen && (
          <ul className="alsolute w-full mt-1 flex flex-col items-start rounded-lg bg-[#F9F9FC] border border-neutral-100 text-neutral-600 font-normal text-sm">
            <div className="flex items-center justify-between w-full h-10 px-3 sticky top-0 bg-[#F9F9FC] rounded-b-lg">
              <HeaderIcon item={<HiMiniMagnifyingGlass />} styling={`size-5`} />
              <input
                type="text"
                className="px-3 py-2 w-full rounded-lg bg-[#F9F9FC] border border-neutral-100 text-neutral-600 font-normal text-sm placeholder:text-neutral-400 focus:outline-none"
                placeholder={props.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
              />
              <div
                onClick={() => {
                  setSearchQuery("");
                }}
              >
                <HeaderIcon item={<HiMiniXMark />} styling={`size-5`} />
              </div>
            </div>
            {props.loadingCate ? (
              <li className="px-3 py-2 flex items-center justify-between rounded-lg w-full h-10 cursor-pointer hover:bg-neutral-400 hover:text-white focus:outline-non">
                Loading
              </li>
            ) : (
              <div className="w-full overflow-y-auto max-h-60">
                {props.listData?.map((item) => (
                  <li
                    key={item?.id}
                    value={item?.id}
                    className={`px-3 py-2 flex items-center justify-between rounded-lg w-full h-10 cursor-pointer hover:bg-neutral-400 hover:text-white focus:outline-non 
                  ${item?.id === selected?.id && "bg-neutral-400 text-white"}
                  
                  ${
                    item?.name?.toLowerCase().startsWith(searchQuery)
                      ? "block"
                      : "hidden"
                  }`}
                    onClick={() => {
                      if (item?.id !== selected?.id) {
                        handleChange(item);
                        // setSelected(item);
                        // props.updated(item.id);
                        setIsOpen(!isOpen);
                        setSearchQuery("");
                      }
                    }}
                  >
                    {item?.name}
                  </li>
                ))}
              </div>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
