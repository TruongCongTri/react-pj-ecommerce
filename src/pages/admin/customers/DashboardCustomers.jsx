import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../../components/layouts/BreadCrumb";
import NormalButton from "../../../components/buttons/NormalButton";
import SearchInput from "../../../components/forms/SearchInput";
import CustomerTable from "../../../components/tables/CustomerTable";

import HeaderIcon from "../../../components/icons/HeaderIcon";
import { PiExportBold } from "react-icons/pi";
import { HiMiniPlus } from "react-icons/hi2";

import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import apis from "../../../apis";

export default function DashboardCustomers() {
  // Lưu lại danh sách customers từ server
  const [listData, setListData] = useState([]);
  // Dùng để set state loading của table (first load hoặc searching)
  const [loadingGet, setLoadingGet] = useState(false);

  // call api get list customers data
  // useEffect(() => {
  //   setLoadingGet(true);
  //   apis.customers
  //     .getData()
  //     .then(
  //       (res) => {
  //         const { customers } = res.data.data;
  //         // xử lý categories nếu cần (Xử lý computed data)
  //         setListData(customers);
  //       },
  //       (err) => {
  //         console.log(err);
  //       }
  //     )
  //     .finally(() => {
  //       setTimeout(() => {
  //         setLoadingGet(false);
  //       }, 1000);
  //     });
  //   return () => {};
  // }, []);
  
  useEffect(() => {
    setListData([
      {
        id: "ID-011221",
        name: "John Bushmill",
        email: "Johnb@mail.com",
        image: "",
        phone: "078 5054 8877",
        address: "1833 Bel Meadow Drive, Fontana, California 92335, USA",
        createdAt: "2024-12-17T13:28:37.862Z",
        status: 1,
      }, 
      {
        id: "ID-011222",
        name: "John Bushmill 2",
        email: "Johnb2@mail.com",
        image: "",
        phone: "078 5054 8877",
        address: "1833 Bel Meadow Drive, Fontana, California 92335, USA",
        createdAt: "2024-12-17T13:28:37.862Z",
        status: 2,
      }, 
      {
        id: "ID-011223",
        name: "John Bushmill 3",
        email: "Johnb3@mail.com",
        image: "",
        phone: "078 5054 8877",
        address: "1833 Bel Meadow Drive, Fontana, California 92335, USA",
        createdAt: "2024-12-17T13:28:37.862Z",
        status: 3,
      }, 
    ]);
    // setLoadingGet(true);
  }, [])
  

  const navigate = useNavigate();
  const handleAddCustomer = () => {
    // Xử lý đăng nhập thành công
    navigate("/admin/customers/add");
  };
  const handleExportCustomer = () => {
    console.log("export Customer");
  };


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
            onClick={handleExportCustomer}
          >
            Export
          </NormalButton>

          <NormalButton
            color="bg-[#5C59E8]"
            text="text-white font-semibold text-sm"
            icon={<HiMiniPlus />}
            iconStyle="size-5"
            onClick={handleAddCustomer}
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
        <CustomerTable data={listData} loading={loadingGet}></CustomerTable>
      </div>
      <div></div>
    </div>
  );
}
