/* eslint-disable react/prop-types */
import React from "react";

import HeaderIcon from "../icons/HeaderIcon";
import Pagination from "../tables/Pagination";
import { HiChevronDown } from "react-icons/hi2";

// columns: An array of objects defining the headers and accessors for the table columns.
// data: An array of objects representing the rows of data to display.

export default function NormalTable({ columns, data }) {
  return (
    <div className="relative rounded-lg w-full text-left bg-white border border-gray-200 ">
      <table className="">
        <thead className="font-medium text-sm text-gray-700 uppercase bg-[#F9F9FC]">
          <tr>
            {columns.map((column, colIndex) => {
              if (colIndex === 0) {
                return (
                  <th
                    key={column.accessor}
                    className="py-[18px] px-[22px] text-left flex justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        id="checkbox-all-search"
                        type="checkbox"
                        className="size-5 text-blue-600 bg-white rounded-lg focus:ring-blue-500 "
                      />
                      <label htmlFor="checkbox-all-search" className="sr-only">
                        checkbox
                      </label>
                      <div>{column.Header}</div>
                    </div>

                    <HeaderIcon
                      item={<HiChevronDown />}
                      styling={"ml-2 size-4 "}
                    />
                  </th>
                );
              }
              return (
                <th
                  key={column.accessor}
                  className="py-[18px] px-[22px] text-left text-gray-600 "
                >
                  <div className="flex justify-between">
                    {column.Header}
                    <HeaderIcon
                      item={<HiChevronDown />}
                      styling={"ml-2 size-4 "}
                    />
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              name={rowIndex}
              className="bg-white border-b border-neutral-50 hover:bg-gray-50 font-medium text-sm text-neutral-500"
            >
              {columns.map((column, colIndex) => {
                if (colIndex === 0) {
                  switch (column.Header) {
                    case "Product":
                      return <></>;
                    case "Category":
                      return (
                        <td
                          scope="row"
                          key={column.accessor}
                          className="flex items-center py-[18px] px-[22px] text-left whitespace-nowrap"
                        >
                          <div className="flex items-center gap-2">
                            <input
                              id="checkbox-all-search"
                              type="checkbox"
                              className="size-5 text-blue-600 bg-white rounded-lg focus:ring-blue-500 "
                            />
                            <label
                              htmlFor="checkbox-all-search"
                              className="sr-only"
                            >
                              checkbox
                            </label>
                            <div className="flex items-center">
                              <img
                                className="size-[44px] rounded-lg bg-[#E0E2E7]"
                                src={row[column.accessor].image}
                              />
                              <div className="ps-3">
                                <div className="text-neutral-700">
                                  {row[column.accessor].name}
                                </div>
                                <div className="font-normal	text-xs">
                                  {row[column.accessor].desc}
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      );
                    case "Order ID":
                      return <></>;
                    default:
                      return <></>;
                  }
                } else {
                  switch (column.Header) {
                    case "Status":
                      return <></>;
                    default:
                      return (
                        <td
                          key={column.accessor}
                          className="py-[18px] px-[22px] text-left border-b border-gray-200"
                        >
                          {row[column.accessor]}
                        </td>
                      );
                  }
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination></Pagination>
    </div>
  );
}

//flex-column flex-wrap md:flex-row
// dark:text-gray-400 mb-4 md:mb-0 md:inline md:w-auto
