import React, { useState, useMemo } from "react";
import HeaderIcon from "../icons/HeaderIcon";
import Logo from "../../assets/image/dashboard-logo.svg";
import { HiChevronDown } from "react-icons/hi2";
import { HiOutlineEye } from "react-icons/hi2";
import { HiOutlinePencil } from "react-icons/hi2";
import { HiMiniTrash } from "react-icons/hi2";

import LoadingTable from "./LoadingTable";
import { useNavigate } from "react-router-dom";
import ProductStatusIcon from "../icons/ProductStatusIcon";

import Pagination from "../pagination/Pagination";

let PageSize = 10;

export default function ProductTable({ data, loading }) {
  const columns = [
    { Header: "Product", accessor: "name" },
    { Header: "SKU", accessor: "sku" },
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
    // Xử lý đăng nhập thành công
    navigate(`/admin/products/${id}`);
  };
  const handleEditProduct = (id) => {
    // Xử lý đăng nhập thành công
    navigate(`/admin/products/${id}/edit`);
  };

  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  return (
    <div className="relative rounded-lg w-full text-left bg-white border border-gray-200 ">
      <table className="w-full">
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
        {loading ? (
          <LoadingTable />
        ) : (
          <tbody>
            {currentTableData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                name={rowIndex}
                className="cursor-pointer bg-white border-b border-neutral-50 hover:bg-gray-50 font-medium text-sm text-neutral-500"
                onClick={() => {
                  handleViewProduct(row.id);
                }}
              >
                <td className="py-[18px] px-[22px] text-left ">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <img
                          className="size-[44px] rounded-lg bg-[#E0E2E7]"
                          src={row.image}
                          onError={handleErrorImg}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-1/4">
                      <div className="flex items-center">
                        <div className="ps-3">
                          <div className="text-neutral-700">{row.name}</div>
                          <div className="font-normal text-xs truncate ">
                            {row.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-[18px] px-[22px] text-left whitespace-nowrap">
                  <div className="ps-3">
                    <div className="text-neutral-700">302012</div>
                  </div>
                </td>
                <td className="py-[18px] px-[22px] text-left whitespace-nowrap">
                  <div className="ps-3">
                    <div className="text-neutral-700">Bag & Pouch</div>
                  </div>
                </td>
                <td className="py-[18px] px-[22px] text-left whitespace-nowrap">
                  <div className="ps-3">
                    <div className="text-neutral-700">10</div>
                  </div>
                </td>
                <td className="py-[18px] px-[22px] text-left whitespace-nowrap">
                  <div className="ps-3">
                    <div className="text-neutral-700">$121.00</div>
                  </div>
                </td>
                <td className="py-[18px] px-[22px] text-left whitespace-nowrap">
                  <div className="ps-3">
                    <ProductStatusIcon item={row.status} />
                  </div>
                </td>
                <td className="py-[18px] px-[22px] text-left whitespace-nowrap">
                  <div className="ps-3">
                    <div className="text-neutral-700">{row.createdAt}</div>
                  </div>
                </td>
                <td className="py-[18px] px-[22px] text-left whitespace-nowrap">
                  <div className="ps-3 flex justify-center items-center">
                    <div
                      onClick={() => {
                        handleViewProduct(row.id);
                      }}
                    >
                      <HeaderIcon
                        item={<HiOutlineEye />}
                        styling={"ml-2 size-4 "}
                      />
                    </div>
                    <div
                      onClick={() => {
                        handleEditProduct(row.id);
                      }}
                    >
                      <HeaderIcon
                        item={<HiOutlinePencil />}
                        styling={"ml-2 size-4 "}
                      />
                    </div>
                    <HeaderIcon
                      item={<HiMiniTrash />}
                      styling={"ml-2 size-4 "}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      <nav
        className="py-[18px] px-[22px] flex items-center justify-between px-6"
        aria-label="Table navigation"
      >
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={data.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </nav>
    </div>
  );
}
