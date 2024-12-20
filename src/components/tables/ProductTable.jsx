import React, { useState, useMemo } from "react";

import dateFormat from "dateformat";

import HeaderIcon from "../icons/HeaderIcon";
import Logo from "../../assets/image/dashboard-logo.svg";
import { HiChevronDown } from "react-icons/hi2";
import { HiOutlineEye } from "react-icons/hi2";
import { HiOutlinePencil } from "react-icons/hi2";
import { HiMiniTrash } from "react-icons/hi2";

import LoadingTable from "./LoadingTable";
import { Link, useNavigate } from "react-router-dom";
import ProductStatusIcon from "../icons/ProductStatusIcon";

import apis from "../../apis";

export default function ProductTable({ data, loading }) {
  const columns = [
    { Header: "Product", accessor: "name" },
    // { Header: "SKU", accessor: "sku" },
    { Header: "Category", accessor: "category" },
    { Header: "Stock", accessor: "stock" },
    { Header: "Price", accessor: "price" },
    { Header: "Status", accessor: "status" },
    { Header: "Added", accessor: "createdAt" },
    { Header: "Action", accessor: "action" },
  ];
  const handleErrorImg = (e) => {
    e.target.src = Logo;
  };
  const navigate = useNavigate();
  const handleViewProduct = (id) => {
    // Xử lý
    navigate(`/admin/products/${id}`);
  };
  const handleEditProduct = (id) => {
    // Xử lý
    navigate(`/admin/products/${id}/edit`);
  };

  const deleteProduct = (id) => {
    apis.products
      .delete(id)
      .then(
        (res) => {
          // thành công
          navigate("/admin/products");
        },
        (err) => {
          console.log(err);
        }
      )
      .finally(() => {
        // setLoadingCreate(false);
      });
  };

  return (
    
      <table className="w-full">
        <thead className="font-medium text-sm text-gray-700 bg-[#F9F9FC] ">
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
                    {column.Header !== "SKU" &&
                    column.Header !== "Category" &&
                    column.Header !== "Action" ? (
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
                <td className="py-[18px] px-[22px] text-left max-w-[250px]">
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
                          src={row.images[0]}
                          onError={handleErrorImg}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-1/4">
                      <div className="flex items-center">
                        <div className="ps-3">
                          <Link
                            to={`/admin/products/${row.id}`}
                            className="text-neutral-700"
                          >
                            {row.name}
                          </Link>
                          <div className="font-normal text-xs truncate ">
                            {row.description.length > 28
                              ? row.description.substring(0, 28) + "..."
                              : row.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                {/* <td className="py-[18px] px-[22px] text-left whitespace-nowrap">
                  <div className="">
                    <div className="text-neutral-700">{row.sku}</div>
                  </div>
                </td> */}
                <td className="py-[18px] px-[22px] text-left whitespace-nowrap">
                  <div className="">
                    <div className="text-neutral-700">{row.category_id}</div>
                  </div>
                </td>
                <td className="py-[18px] px-[22px] text-left whitespace-nowrap">
                  <div className="">
                    <div className="text-neutral-700">
                      {row.quantity || 10}{" "}
                    </div>
                  </div>
                </td>
                <td className="py-[18px] px-[22px] text-left whitespace-nowrap">
                  <div className="">
                    <div className="text-neutral-700">${row.price}</div>
                  </div>
                </td>
                <td className="py-[18px] px-[22px] text-left whitespace-nowrap">
                  <div className="">
                    <ProductStatusIcon item={row.status_id} />
                  </div>
                </td>
                <td className="py-[18px] px-[22px] text-left whitespace-nowrap">
                  <div className="">
                    <div className="text-neutral-700">
                      {dateFormat(row.created_at, "dd mmm yyyy")}
                    </div>
                  </div>
                </td>
                <td className="py-[18px] px-[22px] text-left whitespace-nowrap">
                  <div className="flex justify-center items-center gap-2">
                    <div
                      className=""
                      onClick={() => {
                        handleViewProduct(row.id);
                      }}
                    >
                      <HeaderIcon item={<HiOutlineEye />} styling={"size-4 "} />
                    </div>
                    <div
                      onClick={() => {
                        handleEditProduct(row.id);
                      }}
                    >
                      <HeaderIcon
                        item={<HiOutlinePencil />}
                        styling={"size-4 "}
                      />
                    </div>
                    <div
                      onClick={() => {
                        // handleDeleteProduct(row.id);
                        deleteProduct(row.id);
                      }}
                    >
                      <HeaderIcon item={<HiMiniTrash />} styling={"size-4 "} />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
  );
}
