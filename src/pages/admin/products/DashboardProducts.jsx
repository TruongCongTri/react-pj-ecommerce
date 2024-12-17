import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import BreadCrumb from "../../../components/layouts/BreadCrumb";
import NormalButton from "../../../components/buttons/NormalButton";
import SearchInput from "../../../components/forms/SearchInput";
import ProductTable from "../../../components/tables/ProductTable";

import { PiExportBold } from "react-icons/pi";
import { HiMiniPlus } from "react-icons/hi2";

import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import apis from "../../../apis";

export default function ProductsDashboard() {
  // Lưu lại danh sách products từ server
  const [listData, setListData] = useState([]);
  // Dùng để set state loading của table (first load hoặc searching)
  const [loadingGet, setLoadingGet] = useState(false);

  const navigate = useNavigate();
  const handleAddProduct = () => {
    // Xử lý tạo mới product
    navigate('/admin/products/add');
  };
  
  const handleExportProduct = () => {
    console.log('export products');
    
  }
  useEffect(() => {
    setLoadingGet(true);
		apis.products
			.getData()
			.then(
				res => {
					const { products } = res.data.data;
					// xử lý products nếu cần (Xử lý computed data)
					setListData(products);
				},
				err => {
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

  //
  // useEffect(() => {
  //   setListData([
  //     {
  //       id: 1,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 1,
  //     },
  //     {
  //       id: 2,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 2,
  //     },
  //     {
  //       id: 3,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 3,
  //     },
  //     {
  //       id: 4,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //     },
  //     {
  //       id: 1,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 1,
  //     },
  //     {
  //       id: 2,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 2,
  //     },
  //     {
  //       id: 3,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 3,
  //     },
  //     {
  //       id: 4,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //     },
  //     {
  //       id: 1,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 1,
  //     },
  //     {
  //       id: 2,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 2,
  //     },
  //     {
  //       id: 3,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 3,
  //     },
  //     {
  //       id: 4,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //     },
  //     {
  //       id: 1,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 1,
  //     },
  //     {
  //       id: 2,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 2,
  //     },
  //     {
  //       id: 3,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 3,
  //     },
  //     {
  //       id: 4,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //     },
  //     {
  //       id: 1,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 1,
  //     },
  //     {
  //       id: 2,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 2,
  //     },
  //     {
  //       id: 3,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 3,
  //     },
  //     {
  //       id: 4,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //     },
  //     {
  //       id: 1,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 1,
  //     },
  //     {
  //       id: 2,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 2,
  //     },
  //     {
  //       id: 3,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 3,
  //     },
  //     {
  //       id: 4,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //     },
  //     {
  //       id: 1,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 1,
  //     },
  //     {
  //       id: 2,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 2,
  //     },
  //     {
  //       id: 3,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 3,
  //     },
  //     {
  //       id: 4,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //     },
  //     {
  //       id: 1,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 1,
  //     },
  //     {
  //       id: 2,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 2,
  //     },
  //     {
  //       id: 3,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 3,
  //     },
  //     {
  //       id: 4,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //     },
  //     {
  //       id: 1,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 1,
  //     },
  //     {
  //       id: 2,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 2,
  //     },
  //     {
  //       id: 3,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 3,
  //     },
  //     {
  //       id: 4,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //     },
  //     {
  //       id: 1,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 1,
  //     },
  //     {
  //       id: 2,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 2,
  //     },
  //     {
  //       id: 3,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 3,
  //     },
  //     {
  //       id: 4,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //     },
  //     {
  //       id: 1,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 1,
  //     },
  //     {
  //       id: 2,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 2,
  //     },
  //     {
  //       id: 3,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 3,
  //     },
  //     {
  //       id: 4,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //     },
  //     {
  //       id: 1,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 1,
  //     },
  //     {
  //       id: 2,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 2,
  //     },
  //     {
  //       id: 3,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 3,
  //     },
  //     {
  //       id: 4,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //     },
  //     {
  //       id: 1,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 1,
  //     },
  //     {
  //       id: 2,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 2,
  //     },
  //     {
  //       id: 3,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 3,
  //     },
  //     {
  //       id: 4,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //     },
  //     {
  //       id: 1,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 1,
  //     },
  //     {
  //       id: 2,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 2,
  //     },
  //     {
  //       id: 3,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 3,
  //     },
  //     {
  //       id: 4,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //     },
  //     {
  //       id: 1,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 1,
  //     },
  //     {
  //       id: 2,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 2,
  //     },
  //     {
  //       id: 3,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 3,
  //     },
  //     {
  //       id: 4,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //     },
  //     {
  //       id: 1,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 1,
  //     },
  //     {
  //       id: 2,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 2,
  //     },
  //     {
  //       id: 3,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 3,
  //     },
  //     {
  //       id: 4,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //     },
  //     {
  //       id: 1,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 1,
  //     },
  //     {
  //       id: 2,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 2,
  //     },
  //     {
  //       id: 3,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 3,
  //     },
  //     {
  //       id: 4,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //     },
  //     {
  //       id: 1,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 1,
  //     },
  //     {
  //       id: 2,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 2,
  //     },
  //     {
  //       id: 3,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 3,
  //     },
  //     {
  //       id: 4,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //     },
  //     {
  //       id: 1,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 1,
  //     },
  //     {
  //       id: 2,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 2,
  //     },
  //     {
  //       id: 3,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 3,
  //     },
  //     {
  //       id: 4,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //     },
  //     {
  //       id: 1,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 1,
  //     },
  //     {
  //       id: 2,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 2,
  //     },
  //     {
  //       id: 3,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 3,
  //     },
  //     {
  //       id: 4,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //     },
  //     {
  //       id: 1,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 1,
  //     },
  //     {
  //       id: 2,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 2,
  //     },
  //     {
  //       id: 3,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 3,
  //     },
  //     {
  //       id: 4,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //     },
  //     {
  //       id: 1,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 1,
  //     },
  //     {
  //       id: 2,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 2,
  //     },
  //     {
  //       id: 3,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 3,
  //     },
  //     {
  //       id: 4,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //     },
  //     {
  //       id: 1,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 1,
  //     },
  //     {
  //       id: 2,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 2,
  //     },
  //     {
  //       id: 3,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 3,
  //     },
  //     {
  //       id: 4,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //     },
  //     {
  //       id: 1,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 1,
  //     },
  //     {
  //       id: 2,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 2,
  //     },
  //     {
  //       id: 3,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 3,
  //     },
  //     {
  //       id: 4,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //     },
  //     {
  //       id: 1,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 1,
  //     },
  //     {
  //       id: 2,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 2,
  //     },
  //     {
  //       id: 3,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 3,
  //     },
  //     {
  //       id: 4,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //     },
  //     {
  //       id: 1,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 1,
  //     },
  //     {
  //       id: 2,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 2,
  //     },
  //     {
  //       id: 3,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 3,
  //     },
  //     {
  //       id: 4,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //     },
  //     {
  //       id: 1,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 1,
  //     },
  //     {
  //       id: 2,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 2,
  //     },
  //     {
  //       id: 3,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 3,
  //     },
  //     {
  //       id: 4,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //     },
  //     {
  //       id: 1,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 1,
  //     },
  //     {
  //       id: 2,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 2,
  //     },
  //     {
  //       id: 3,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 3,
  //     },
  //     {
  //       id: 4,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //     },
  //     {
  //       id: 1,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 1,
  //     },
  //     {
  //       id: 2,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 2,
  //     },
  //     {
  //       id: 3,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 3,
  //     },
  //     {
  //       id: 4,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //     },
  //     {
  //       id: 1,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 1,
  //     },
  //     {
  //       id: 2,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 2,
  //     },
  //     {
  //       id: 3,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 3,
  //     },
  //     {
  //       id: 4,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //     },
  //     {
  //       id: 1,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 1,
  //     },
  //     {
  //       id: 2,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 2,
  //     },
  //     {
  //       id: 3,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 3,
  //     },
  //     {
  //       id: 4,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //     },
  //     {
  //       id: 1,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 1,
  //     },
  //     {
  //       id: 2,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 2,
  //     },
  //     {
  //       id: 3,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 3,
  //     },
  //     {
  //       id: 4,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //     },
  //     {
  //       id: 1,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 1,
  //     },
  //     {
  //       id: 2,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 2,
  //     },
  //     {
  //       id: 3,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //       status: 3,
  //     },
  //     {
  //       id: 4,
  //       name: 'Handmade Pouch',
  //       description: '3 Variants',
  //     },  
  //   ]);
  // }, [])

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
            onClick={handleExportProduct}
          >
            Export
          </NormalButton>

          <NormalButton
            color="bg-[#5C59E8]"
            text="text-white font-semibold text-sm"
            icon={<HiMiniPlus />}
            iconStyle="size-5"
            onClick={handleAddProduct}
          >
            Add Product
          </NormalButton>
        </div>
      </div>

      <div className="flex justify-between mb-6">
        <SearchInput
          size="min-w-[320px] max-w-[320px] "
          icon={<HiMiniMagnifyingGlass />}
          placeholder="Search category. . ."
          name="categorySearch"
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
      <ProductTable data={listData} loading={loadingGet}></ProductTable>
      </div>
      <div></div>
    </div>
  );
}
