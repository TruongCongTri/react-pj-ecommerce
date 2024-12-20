import React from "react";
import IconWithCircleBackground from "../icons/IconWithCircleBackground";
import { BiWallet } from "react-icons/bi";
import PercentageIcon from "../icons/PercentageIcon";

export default function BalanceByCustomer({ item = {}}) {
  const percentage = 15;
  return (
    <div className="w-full h-full rounded-lg bg-white p-5">
      <IconWithCircleBackground
        item={<BiWallet />}
        styling={`size-6 text-[#0D894F]`}
        outline={`bg-[#CFE7DC] border-[#E7F4EE]`}
      />
      <div className="mt-4">
        <div className="font-medium text-base text-neutral-500">Total Revenue</div>
        <div className="flex items-center gap-2">
          <div className="font-medium text-2xl text-neutral-700">$75,500</div>
          <PercentageIcon item={percentage} />
        </div>
      </div>
    </div>
  );
}
