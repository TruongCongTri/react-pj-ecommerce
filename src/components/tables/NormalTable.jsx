/* eslint-disable react/prop-types */
import React from "react";

import HeaderIcon from "../icons/HeaderIcon";
import Pagination from "../tables/Pagination";
import { HiChevronDown } from "react-icons/hi2";

// columns: An array of objects defining the headers and accessors for the table columns.
// data: An array of objects representing the rows of data to display.

export default function NormalTable({ columns, data }) {
  return (
    <div className="relative rounded-lg w-full text-left bg-white border border-neutral-100 ">
      <table className="">
        <thead className="text-xs text-gray-700 uppercase bg-[#F9F9FC]">
          <tr>
            <th scope="col" className="p-2">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            {columns.map((column) => (
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
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              name={rowIndex}
              className="bg-white border-b border-neutral-50 hover:bg-gray-50"
            >
              <td className="p-2">
                <div className="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="checkbox-table-search-1" className="sr-only">
                    checkbox
                  </label>
                </div>
              </td>
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
                          className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          <img
                            className="w-10 h-10 rounded-full"
                            src={row[column.accessor].image}
                            alt="Jese image"
                          />
                          <div className="ps-3">
                            <div className="text-base font-semibold">
                              {row[column.accessor].name}
                            </div>
                            <div className="font-normal text-gray-500">
                              {row[column.accessor].desc}
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
                          className="py-2 px-4 border-b border-gray-200 text-gray-800"
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
