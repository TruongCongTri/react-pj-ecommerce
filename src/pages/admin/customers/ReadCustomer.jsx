import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { SlLock } from "react-icons/sl";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { HiOutlinePhone } from "react-icons/hi2";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { HiOutlineMapPin } from "react-icons/hi2";
import { PiExportBold } from "react-icons/pi";
import { HiMiniWrenchScrewdriver } from "react-icons/hi2";

import Logo from "../../../assets/image/dashboard-logo.svg";

import apis from "../../../apis";

import BreadCrumb from "../../../components/layouts/BreadCrumb";
import NormalButton from "../../../components/buttons/NormalButton";

import IconWithCircleBackground from "../../../components/icons/IconWithCircleBackground";
import SubscriptionIcon from "../../../components/icons/SubscriptionIcon";

import BalanceByCustomer from "../../../components/statistic/BalanceByCustomer";
import OrdersByCustomer from "../../../components/statistic/OrdersByCustomer";
import RewardPointsByCustomer from "../../../components/statistic/RewardPointsByCustomer";

export default function ReadCustomer() {
  // Lưu lại danh sách categories từ server
  const [singleData, setSingleData] = useState([]);
  // Dùng để set state loading của table (first load hoặc searching)
  const [loadingGet, setLoadingGet] = useState(false);

  const params = useParams();
  const navigate = useNavigate();
  const handleEditProduct = () => {
    // Xử lý đăng nhập thành công
    navigate(`/admin/products/${params.id}/edit`);
  };

  // useEffect(() => {
  //   setLoadingGet(true);
  //   apis.products
  //     .getSingleData(params.id)
  //     .then(
  //       (res) => {
  //         const { product } = res.data.data;
  //         // xử lý category nếu cần (Xử lý computed data)
  //         setSingleData(product);
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
    setLoadingGet(true);
    setSingleData({
      id: "ID-011221",
      name: "John Bushmill",
      email: "Johnb@mail.com",
      image: null,
      phone: "078 5054 8877",
      address: "1833 Bel Meadow Drive, Fontana, California 92335, USA",
      createdAt: "2024-12-17T13:28:37.862Z",
      status: 1,
    });
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

  console.log(singleData);

  return (
    <>
      {singleData.length !== 0 ? (
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
                text="text-white"
                border="border border-[#5C59E8]"
                type="submit"
                icon={<HiMiniWrenchScrewdriver />}
                iconStyle="size-5"
                onClick={handleEditProduct}
              >
                Edit Customer
              </NormalButton>
            </div>
          </div>

          {loadingGet ? (
            <div>Loading customer data</div>
          ) : (
            <div className="grid grid-cols-4 grid-rows-3 gap-6">
              <div className="col-span-1">
                {/* general information */}
                <div className="w-full p-2 bg-white shadow-xl rounded-lg text-gray-900">
                  <div className="rounded-t-lg h-32 overflow-hidden">
                    <div className="object-cover object-top w-full h-[344px] bg-[#5C59E8]"></div>
                  </div>
                  {/* avatar */}
                  <div className="mx-auto w-[164px] h-[164px] relative -mt-[82px] border border-white rounded-full overflow-hidden bg-[#E0E2E7]">
                    <img
                      className="object-cover object-top w-full"
                      src={singleData.image}
                      onError={handleErrorImg}
                    />
                  </div>
                  {/* basic info */}
                  <div className="text-center mt-2">
                    <div className="flex justify-center items-center gap-2 mb-2">
                      <h2 className="font-medium text-base text-neutral-700">
                        {singleData.name}
                      </h2>
                      <SubscriptionIcon item={1} />
                    </div>
                    <p className="font-medium text-xs text-neutral-500">
                      {singleData.email}
                    </p>
                  </div>

                  {/* detailed info */}
                  <div className="mx-[24px] mb-[24px] mt-[18px] text-gray-700 border-t border-[#E0E2E7]">
                    <div className="flex items-top justify-start my-[18px] gap-2">
                      <IconWithCircleBackground
                        item={<SlLock />}
                        styling={`size-6 text-[#667085]`}
                        outline={`bg-[#E0E2E7] border-[#F0F1F3]`}
                      />
                      <div>
                        <div className="font-medium text-sm text-neutral-600">
                          User ID
                        </div>
                        <div className="font-medium text-sm text-neutral-800">
                          {singleData.id}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-top justify-start my-[18px] gap-2">
                      <IconWithCircleBackground
                        item={<HiOutlineEnvelope />}
                        styling={`size-6 text-[#667085]`}
                        outline={`bg-[#E0E2E7] border-[#F0F1F3]`}
                      />
                      <div>
                        <div className="font-medium text-sm text-neutral-600">
                          Billing Email
                        </div>
                        <div className="font-medium text-sm text-neutral-800">
                          {singleData.email}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-top justify-start my-[18px] gap-2">
                      <IconWithCircleBackground
                        item={<HiOutlinePhone />}
                        styling={`size-6 text-[#667085]`}
                        outline={`bg-[#E0E2E7] border-[#F0F1F3]`}
                      />
                      <div>
                        <div className="font-medium text-sm text-neutral-600">
                          Phone Number
                        </div>
                        <div className="font-medium text-sm text-neutral-800">
                          {singleData.phone}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-top justify-start my-[18px] gap-2">
                      <IconWithCircleBackground
                        item={<HiOutlineShoppingCart />}
                        styling={`size-6 text-[#667085]`}
                        outline={`bg-[#E0E2E7] border-[#F0F1F3]`}
                      />
                      <div>
                        <div className="font-medium text-sm text-neutral-600">
                          Delivery Address
                        </div>
                        <div className="font-medium text-sm text-neutral-800 text-wrap">
                          {singleData.address}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-top justify-start my-[18px] gap-2">
                      <IconWithCircleBackground
                        item={<HiOutlineMapPin />}
                        styling={`size-6 text-[#667085]`}
                        outline={`bg-[#E0E2E7] border-[#F0F1F3]`}
                      />
                      <div>
                        <div className="font-medium text-sm text-neutral-600">
                          Latest Transaction
                        </div>
                        <div className="font-medium text-sm text-neutral-800 text-wrap">
                          12 December 2022
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* category */}
              <div className="col-span-3">
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-1">
                    <BalanceByCustomer item={singleData.id} />
                  </div>
                  <div className="col-span-1">
                    <OrdersByCustomer item={singleData.id} />
                  </div>
                  <div className="col-span-1">
                    <RewardPointsByCustomer item={singleData.id} />
                  </div>
                </div>
                <div></div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <h1>Customer does not exist</h1>
      )}
    </>
  );
}
