import React from "react";
import IconWithCircleBackground from "../icons/IconWithCircleBackground";
import { PiMoneyBold } from "react-icons/pi";
import PercentageIcon from "../icons/PercentageIcon";

export default function TotalRevenue({ item = {} }) {
  return (
    <div className="w-full h-full rounded-lg bg-white p-5">
      <IconWithCircleBackground
        item={<PiMoneyBold />}
        styling={`size-6 text-[#5C59E8]`}
        outline={`bg-[#DEDEFA] border-[#EFEFFD]`}
      />
      <div className="mt-4">
        <div className="font-medium text-base text-neutral-500">Total Revenue</div>
        <div className="flex items-center gap-2">
          <div className="font-medium text-2xl text-neutral-700">$75,500</div>
          <PercentageIcon item={item} />
        </div>
      </div>
    </div>
  );
}
