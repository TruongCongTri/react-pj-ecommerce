import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import BreadCrumb from "../../../components/layouts/BreadCrumb";
import NormalButton from "../../../components/buttons/NormalButton";
import SearchInput from "../../../components/forms/SearchInput";
import CategoryTable from "../../../components/tables/CategoryTable";

// import { HiMiniArrowLeftStartOnRectangle } from "react-icons/hi2";
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
  // Dùng để lấy search
  const [query, setQuery] = useState("");
  const [filteredDatas, setFilterDatas] = useState([]);

  const navigate = useNavigate();

  const handleAddCate = () => {
    // Xử lý đăng nhập thành công
    navigate("/admin/categories/add");
  };
  const handleExportCate = () => {
    console.log("export cate");
  };

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

  // search handling
  const handleChange = (event) => {
    setQuery(event.target.value);
  };
  useEffect(() => {
    let filtered = listData;
    if (query !== " ") {
      filtered = listData.filter(
        (cate) =>
          cate.name
            .trim()
            .toLowerCase()
            .includes(query.trim().toLowerCase())
      );
    } 
    setFilterDatas(filtered);
  }, [query]);

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
        <SearchInput
          size="min-w-[320px] max-w-[320px] "
          icon={<HiMiniMagnifyingGlass />}
          placeholder="Search category. . ."
          name="categorySearch"
          onChange={handleChange}
          value={query}
          required
        ></SearchInput>

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
        <CategoryTable data={filteredDatas} loading={loadingGet}></CategoryTable>
      </div>
      <div></div>
    </div>
  );
}
