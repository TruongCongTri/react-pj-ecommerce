import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import BreadCrumb from "../../../components/layouts/BreadCrumb";
import NormalButton from "../../../components/buttons/NormalButton";
import SearchInput from "../../../components/forms/SearchInput";
import CategoryTable from "../../../components/tables/CategoryTable";

// import { HiMiniArrowLeftStartOnRectangle } from "react-icons/hi2";

import HeaderIcon from "../../../components/icons/HeaderIcon";
import { PiExportBold } from "react-icons/pi";
import { HiMiniPlus } from "react-icons/hi2";

import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import apis from "../../../apis";

export default function CategoriesDashboard() {
  // Lưu lại danh sách categories từ server
  const [listData, setListData] = useState([]);
  // Dùng để set state loading của table (first load hoặc searching)
  const [loadingGet, setLoadingGet] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const navigate = useNavigate();
  const handleAddCate = () => {
    // Xử lý đăng nhập thành công
    navigate("/admin/categories/add");
  };
  const handleExportCate = () => {
    console.log("export cate");
  };

  // call api get list cate data
  useEffect(() => {
    setLoadingGet(true);
    apis.categories
      .getData()
      .then(
        (res) => {
          const { categories } = res.data.data;
          // xử lý categories nếu cần (Xử lý computed data)
          setListData(categories);
        },
        (err) => {
          console.log(err);
        }
      )
      .finally(() => {
        setTimeout(() => {
          setLoadingGet(false);
        }, 1000);
      });
    return () => {};
  }, []);

  useEffect(() => {
    const filtered = listData;
    setFilteredData(filtered);
  }, [listData]);

  useEffect(() => {
    const filtered = listData.filter((o) =>
      o.name.trim().toLowerCase().includes(searchQuery.trim().toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchQuery]);

  return (
    <div className="mx-6 my-8 ">
      <div className="flex justify-between mb-6">
        <div>
          <BreadCrumb />
        </div>
        <div className="flex gap-x-4 items-end ">
          <NormalButton
            color="bg-[#DEDEFA]"
            text="text-[#5C59E8] font-semibold text-sm"
            type="submit"
            icon={<PiExportBold />}
            iconStyle="size-5"
            onClick={handleExportCate}
          >
            Export
          </NormalButton>

          <NormalButton
            color="bg-[#5C59E8]"
            text="text-white font-semibold text-sm"
            icon={<HiMiniPlus />}
            iconStyle="size-5"
            onClick={handleAddCate}
          >
            Add Category
          </NormalButton>
        </div>
      </div>

      <div className="flex justify-between mb-6">
        {/* <SearchInput
          size="min-w-[320px] max-w-[320px] "
          icon={<HiMiniMagnifyingGlass />}
          placeholder="Search category. . ."
          name="categorySearch"
          data={listData}
          updatedData={(_value) => {
            setFilteredData(_value);
           }}
        /> */}
        <div
          className={`flex items-center rounded-lg min-h-10 max-h-10 min-w-[320px] max-w-[320px] bg-white border`}
        >
          <div className="flex w-full px-3 py-2">
            {/* {props.label ? <label htmlFor={props.id}>{props.label}</label> : <></>}  */}

            <HeaderIcon
              item={<HiMiniMagnifyingGlass />}
              styling={`mr-1 size-5 text-neutral-500`}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search category. . ."
              name="categorySearch"
              className={`text-neutral-400 font-normal text-sm placeholder:text-neutral-400 w-full focus:outline-none`}
            />
          </div>
        </div>

        <NormalButton
          color="bg-white"
          border="border"
          text="text-neutral-500 font-medium text-sm"
          size="min-w-[98px] max-w-[98px] min-h-10 max-h-10"
          type="submit"
          icon={<HiMiniAdjustmentsHorizontal />}
          iconStyle="size-5"
        >
          Filters
        </NormalButton>
      </div>
      <div>
        <CategoryTable data={filteredData} loading={loadingGet}></CategoryTable>
      </div>
      <div></div>
    </div>
  );
}
