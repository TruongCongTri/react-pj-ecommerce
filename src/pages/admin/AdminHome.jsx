import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { HiOutlineCalendarDateRange } from "react-icons/hi2";

import { HiMiniPlus } from "react-icons/hi2";

import Logo from "../../assets/image/dashboard-logo.svg";

import apis from "../../apis";

import NormalButton from "../../components/buttons/NormalButton";

import TotalBalance from "../../components/statistic/TotalBalance";
import TotalSales from "../../components/statistic/TotalSales";
import TotalRevenue from "../../components/statistic/TotalRevenue";

export default function ReadCustomer() {
  
  // Dùng để set state loading của table (first load hoặc searching)
  const [loadingGet, setLoadingGet] = useState(false);

  const params = useParams();
  const navigate = useNavigate();
  const handleAddProduct = () => {
    // Xử lý đăng nhập thành công
    navigate(`/admin/products/add`);
  };

  useEffect(() => {
    setLoadingGet(true);
    
    setTimeout(() => {
      setLoadingGet(false);
    }, 1000);
    return () => {};
  }, []);

  const handleErrorImg = (e) => {
    e.target.src = Logo;
  };

  const handleExportCustomer = () => {
    console.log("export Customer");
  };



  return (
    <>
        <div className="mx-6 my-8 ">
          <div className="flex justify-end mb-6">
            <div className="flex gap-x-4 items-end ">
              <NormalButton
                color="bg-white"
                text="text-[#667085] font-semibold text-sm"
                type="submit"
                icon={<HiOutlineCalendarDateRange />}
                iconStyle="size-5"
                onClick={handleExportCustomer}
              >
                Select Dates
              </NormalButton>
              <NormalButton
                color="bg-[#5C59E8]"
                text="text-white"
                border="border border-[#5C59E8]"
                type="submit"
                icon={<HiMiniPlus />}
                iconStyle="size-5"
                onClick={handleAddProduct}
              >
                Add Product
              </NormalButton>
            </div>
          </div>

          {loadingGet ? (
            <div>Loading data</div>
          ) : (
            <div >
              {/* satistic */}
              <div >
                <div className="grid grid-cols-4 gap-6">
                  <div className="col-span-1">
                    <TotalRevenue item={25} />
                  </div>
                  <div className="col-span-1">
                    <TotalSales item={0} />
                  </div>
                  <div className="col-span-1">
                    <TotalBalance item={-15} />
                  </div>
                </div>
                <div>

                  tables
                </div>
              </div>
            </div>
          )}
        </div>
    </>
  );
}
