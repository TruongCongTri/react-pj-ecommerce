import React from "react";
import { Link, useNavigate } from "react-router-dom";
import dateFormat from "dateformat";

import HeaderIcon from "../icons/HeaderIcon";
import Logo from "../../assets/image/dashboard-logo.svg";

import LoadingTable from "./LoadingTable";
import CustomerStatusIcon from "../icons/CustomerStatusIcon";

import { HiChevronDown } from "react-icons/hi2";
import { HiOutlineEye } from "react-icons/hi2";
import { HiOutlinePencil } from "react-icons/hi2";
import { HiMiniTrash } from "react-icons/hi2";

export default function CategoryTable({ data, loading }) {
  const columns = [
    { Header: "Customer Name", accessor: "name" },
    { Header: "Phone", accessor: "phone" },
    { Header: "Orders", accessor: "orders" },
    { Header: "Balance", accessor: "balance" },
    { Header: "Status", accessor: "status" },
    { Header: "Added", accessor: "createdAt" },
    { Header: "Action", accessor: "action" },
  ];
  const handleErrorImg = (e) => {
    e.target.src = Logo;
  };
  const navigate = useNavigate();
  const handleViewCustomer = (id) => {
    // Xử lý xem chi tiết Customer
    navigate(`/admin/customers/${id}`);
  };
  const handleEditCustomer = (id) => {
    // Xử lý chỉnh sửa thông tin customer
    navigate(`/admin/customers/${id}/edit`);
  };

  const handleDeleteCustomer = (id) => {
    // Xử lý xóa Customer
    console.log(`xóa cate thành công customer id ${id}`);
  };

  return (
    <div className=" rounded-lg w-full text-left bg-white border border-gray-200 ">
      <table className="w-full">
        <thead className="font-medium text-sm text-gray-700 bg-[#F9F9FC]">
          <tr>
            {columns.map((column, colIndex) => {
              if (colIndex === 0) {
                return (
                  <th
                    key={column.accessor}
                    className="py-[18px] px-[22px] text-left max-w-[250px]"
                  >
                    <div className="flex justify-between">
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
                        <div>{column.Header}</div>
                      </div>

                      <HeaderIcon
                        item={<HiChevronDown />}
                        styling={"ml-2 size-4 "}
                      />
                    </div>
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
                    {column.Header !== "Phone" && column.Header !== "Action" ? (
                      <HeaderIcon
                        item={<HiChevronDown />}
                        styling={"ml-2 size-4 "}
                      />
                    ) : null}
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
              >
                <td className="py-[18px] px-[22px] text-left max-w-[612px] ">
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
                          <Link
                            to={`/admin/customers/${row.id}`}
                            className="text-neutral-700"
                          >
                            {row.name}
                          </Link>
                          <div className="font-normal text-xs text-wrap">
                            {row.email}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-[18px] px-[22px] text-left whitespace-nowrap">
                  <div className="">
                    <div className="text-neutral-700">{row.phone}</div>
                  </div>
                </td>
                <td className="py-[18px] px-[22px] text-left whitespace-nowrap">
                  <div className="">
                    <div className="text-neutral-700">124</div>
                  </div>
                </td>
                <td className="py-[18px] px-[22px] text-left whitespace-nowrap">
                  <div className="">
                    <div className="text-neutral-700">$121.00</div>
                  </div>
                </td>
                <td className="py-[18px] px-[22px] text-left whitespace-nowrap">
                  <div className="">
                    <CustomerStatusIcon item={row.status} />
                  </div>
                </td>
                <td className="py-[18px] px-[22px] text-left whitespace-nowrap">
                  <div className="">
                    <div className="text-neutral-700">
                      {dateFormat(row.createdAt, "dd mmm yyyy")}
                    </div>
                  </div>
                </td>
                <td className="py-[18px] px-[22px] text-left whitespace-nowrap">
                  <div className="flex justify-center items-center">
                    <div
                      onClick={() => {
                        handleViewCustomer(row.id);
                      }}
                    >
                      <HeaderIcon
                        item={<HiOutlineEye />}
                        styling={"ml-2 size-4 "}
                      />
                    </div>
                    <div
                      onClick={() => {
                        handleEditCustomer(row.id);
                      }}
                    >
                      <HeaderIcon
                        item={<HiOutlinePencil />}
                        styling={"ml-2 size-4 "}
                      />
                    </div>
                    <div
                      onClick={() => {
                        handleDeleteCustomer(row.id);
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
    </div>
  );
}
