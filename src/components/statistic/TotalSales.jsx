import React from 'react'
import IconWithCircleBackground from '../icons/IconWithCircleBackground';
import { TbShoppingCart } from "react-icons/tb";
import PercentageIcon from "../icons/PercentageIcon";


export default function TotalSales({ item = {} }) {
  return (
    <div className="w-full h-full rounded-lg bg-white p-5">
          <IconWithCircleBackground
            item={<TbShoppingCart />}
            styling={`size-6 text-[#E46A11]`}
            outline={`bg-[#FAE1CF] border-[#FDF1E8]`}
          />
          <div className="mt-4">
            <div className="font-medium text-base text-neutral-500">Total Sales</div>
            <div className="flex items-center gap-2">
              <div className="font-medium text-2xl text-neutral-700">31,500</div>
            <PercentageIcon item={item} />
            </div>
          </div>
        </div>
  )
}
