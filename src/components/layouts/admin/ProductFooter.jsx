import React from "react";
import { useNavigate } from "react-router-dom";

import NormalButton from "../../../components/buttons/NormalButton";
import TableStatus from "../../icons/TableStatus";

import { HiMiniPlus } from "react-icons/hi2";
import { HiMiniXMark } from "react-icons/hi2";

import apis from "../../../apis";

export default function ProductFooter() {
  const handleCancel = () => {
    navigate("/admin/categories");
  };

  return (
    <div className="min-h-[72px] max-h-[72px] border-b-[1px] flex justify-between items-center px-6 py-4 bg-white sticky bottom-0 z-100">

        <div className="flex gap-4">
          <div className="font-medium text-base text-neutral-700 ">Product Completion </div>
          <TableStatus tittle="0%" style="bg-[#FEEDEC]" text="text-[#F04438]" />
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
            onClick={handleCancel}
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
            //   onClick={handleAddCate}
          >
            Add Category
          </NormalButton>
        </div>
    </div>
  );
}
