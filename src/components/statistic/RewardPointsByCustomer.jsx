import React from "react";
import IconWithCircleBackground from "../icons/IconWithCircleBackground";
import { PiSealCheckBold } from "react-icons/pi";
import PercentageIcon from "../icons/PercentageIcon";

export default function RewardPointsByCustomer({ item = {} }) {
  const percentage = 15;
  return (
    <div className="w-full h-full rounded-lg bg-white p-5 shadow-[0px_1.5px_0px_0px] shadow-[#1018281A]">
      <IconWithCircleBackground
        item={<PiSealCheckBold />}
        styling={`size-6 text-[#5C59E8]`}
        outline={`bg-[#DEDEFA] border-[#EFEFFD]`}
      />
      <div className="mt-4">
        <div className="font-medium text-base text-neutral-500">
          Reward Points
        </div>
        <div className="flex items-center gap-2">
          <div className="font-medium text-2xl text-neutral-700">1400</div>
          <PercentageIcon item={percentage} />
        </div>
      </div>
    </div>
  );
}
