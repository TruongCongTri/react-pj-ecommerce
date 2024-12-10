import React from 'react'
import BreadCrumb from '../../../components/layouts/BreadCrumb'
import NormalButton from '../../../components/buttons/NormalButton'
import { HiMiniPlus } from "react-icons/hi2";
import { HiMiniXMark } from "react-icons/hi2";

export default function OrdersDashboard() {
  const handleClick = () => {
    console.log("Button was clicked!");
  };
  return (
    <div className="mx-6 my-8 ">
      <div className="flex justify-between mb-6">
        <div>
          <BreadCrumb />
        </div>
        <div className="flex gap-x-4 items-end ">
          <NormalButton
            color="bg-[#F9F9FC]"
            text="text-neutral-400"
            border="border border-neutral-400"
            // size="min-w-[100px] max-w-[100px] min-h-10 max-h-10"
            type="submit"
            icon={<HiMiniXMark />}
            iconStyle="size-5 "
            onClick={handleClick}
          >
            Cancel
          </NormalButton>

          <NormalButton
            color="bg-[#5C59E8]"
            text="text-white"
            border="border border-[#5C59E8]"
            // size="min-w-[147px] max-w-[147px] min-h-10 max-h-10"
            type="submit"
            icon={<HiMiniPlus />}
            iconStyle="size-5"
            onClick={handleClick}
          >
            Add Order
          </NormalButton>
        </div>
      </div>

      
    </div>
  )
}
