import React from "react";
import IconWithCircleBackground from "../icons/IconWithCircleBackground";
import { BiWallet } from "react-icons/bi";
import PercentageIcon from "../icons/PercentageIcon";

export default function TotalBalance({ item = {} }) {
  
  return (
    <div className="w-full h-full rounded-lg bg-white p-5 shadow-[0px_1.5px_0px_0px] shadow-[#1018281A]">
      <IconWithCircleBackground
        item={<BiWallet />}
        styling={`size-6 text-[#0D894F]`}
        outline={`bg-[#CFE7DC] border-[#E7F4EE]`}
      />
      <div className="mt-4">
        <div className="font-medium text-base text-neutral-500">Balance</div>
        <div className="flex items-center gap-2">
          <div className="font-medium text-2xl text-neutral-700">$24,500</div>
          <PercentageIcon item={item} />
        </div>
      </div>
    </div>
  );
}
