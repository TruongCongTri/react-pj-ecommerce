import React from "react";
import IconWithCircleBackground from "../icons/IconWithCircleBackground";
import { TbShoppingCart } from "react-icons/tb";
import PercentageIcon from "../icons/PercentageIcon";

export default function OrdersByCustomer({ item = {} }) {
  const percentage = 0;
  return (
    <div className="w-full h-full rounded-lg bg-white p-5">
      <IconWithCircleBackground
        item={<TbShoppingCart />}
        styling={`size-6 text-[#E46A11]`}
        outline={`bg-[#FAE1CF] border-[#FDF1E8]`}
      />
      <div className="mt-4">
        <div className="font-medium text-base text-neutral-500">
          Total Orders
        </div>
        <div className="flex items-center gap-2">
          <div className="font-medium text-2xl text-neutral-700">1,296</div>
          <PercentageIcon item={percentage} />
        </div>
      </div>
    </div>
  );
}
