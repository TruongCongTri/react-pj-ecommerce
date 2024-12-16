import React from "react";
import { useNavigate } from "react-router-dom";
import dateFormat from "dateformat";

import HeaderIcon from "../icons/HeaderIcon";
import Pagination from "./Pagination";
import PaginatedItems from "./PaginatedItems";
import Logo from "../../assets/image/dashboard-logo.svg";

import LoadingTable from "./LoadingTable";

import { HiChevronDown } from "react-icons/hi2";
import { HiOutlineEye } from "react-icons/hi2";
import { HiOutlinePencil } from "react-icons/hi2";
import { HiMiniTrash } from "react-icons/hi2";

export default function CategoryTable({ data, loading }) {
  const columns = [
    { Header: "Category", accessor: "name" },
    { Header: "Sales", accessor: "sales" },
    { Header: "Stock", accessor: "stock" },
    { Header: "Added", accessor: "createdAt" },
    { Header: "Action", accessor: "action" },
  ];
  const handleErrorImg = (e) => {
    e.target.src = Logo;
  };
  const navigate = useNavigate();
  const handleViewCate = (id) => {
    // Xử lý xem chi tiết category
    navigate(`/admin/categories/${id}`);
  };
  const handleEditCate = (id) => {
    // Xử lý chỉnh sửa thông tin category
    navigate(`/admin/categories/${id}/edit`);
  };
  const handleDeleteCate = (id) => {
    // Xử lý xóa category
    console.log("xóa cate thành công");
  };

  return (
    <div className="relative rounded-lg w-full text-left bg-white border border-gray-200 ">
      <table className="w-full">
        <thead className="font-medium text-sm text-gray-700 bg-[#F9F9FC]">
          <tr>
            {columns.map((column, colIndex) => {
              if (colIndex === 0) {
                return (
                  <th
                    key={column.accessor}
                    className="py-[18px] px-[22px] text-left flex justify-between max-w-[612px]"
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
        {loading ? (
          <LoadingTable />
        ) : (
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                name={rowIndex}
                className="cursor-pointer bg-white border-b border-neutral-50 hover:bg-gray-50 font-medium text-sm text-neutral-500"
                onClick={() => {
                  handleViewCate(row.id);
                }}
              >
                <td className="py-[18px] px-[22px] text-left flex max-w-[612px] ">
                  <div className="flex items-center gap-2">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="size-5 text-blue-600 bg-white rounded-lg focus:ring-blue-500 "
                    />
                    <label htmlFor="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <img
                          className="size-[44px] rounded-lg bg-[#E0E2E7]"
                          src={row.image}
                          onError={handleErrorImg}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-3/4">
                      <div className="flex items-center">
                        <div className="ps-3">
                          <div className="text-neutral-700">{row.name}</div>
                          <div className="font-normal text-xs text-wrap">
                            {row.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-[18px] px-[22px] text-left whitespace-nowrap">
                  <div className="ps-3">
                    <div className="text-neutral-700">15,020</div>
                  </div>
                </td>
                <td className="py-[18px] px-[22px] text-left whitespace-nowrap">
                  <div className="ps-3">
                    <div className="text-neutral-700">901</div>
                  </div>
                </td>
                <td className="py-[18px] px-[22px] text-left whitespace-nowrap">
                  <div className="ps-3">
                    <div className="text-neutral-700">
                      {dateFormat(row.createdAt, "dd mmm yyyy")}
                    </div>
                  </div>
                </td>
                <td className="py-[18px] px-[22px] text-left whitespace-nowrap">
                  <div className="ps-3 flex justify-center items-center">
                    <div
                      onClick={() => {
                        handleViewCate(row.id);
                      }}
                    >
                      <HeaderIcon
                        item={<HiOutlineEye />}
                        styling={"ml-2 size-4 "}
                      />
                    </div>
                    <div
                      onClick={() => {
                        handleEditCate(row.id);
                      }}
                    >
                      <HeaderIcon
                        item={<HiOutlinePencil />}
                        styling={"ml-2 size-4 "}
                      />
                    </div>
                    <div
                      onClick={() => {
                        handleDeleteCate(row.id);
                      }}
                    >
                      <HeaderIcon
                        item={<HiMiniTrash />}
                        styling={"ml-2 size-4 "}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      
      <Pagination></Pagination>

    </div>
  );
}
