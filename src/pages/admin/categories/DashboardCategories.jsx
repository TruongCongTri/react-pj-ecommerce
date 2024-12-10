import React from "react";

import BreadCrumb from "../../../components/layouts/BreadCrumb";
import NormalButton from "../../../components/buttons/NormalButton";
import LinkButton from "../../../components/buttons/LinkButton";
import SearchInput from "../../../components/forms/SearchInput";
import NormalTable from "../../../components/tables/NormalTable";

// import { HiMiniArrowLeftStartOnRectangle } from "react-icons/hi2";
import { PiExportBold } from "react-icons/pi";
import { HiMiniPlus } from "react-icons/hi2";

import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

export default function CategoriesDashboard() {
  const columns = [
    { Header: 'Category', accessor: 'category' },
    { Header: 'Sales', accessor: 'sales' },
    { Header: 'Stock', accessor: 'stock' },
    { Header: 'Added', accessor: 'added' },
    { Header: 'Action', accessor: 'action' },
  ];
//{ name: 'Bag & Pounch', image: '', desc: 'Great fashion, great selections, great prices.' }
//{ name: 'Watch', image: '', desc: 'Our range of watches are perfect whether you’re looking to upgrade.' }
//{ name: 'Audio', image: '', desc: 'Our big range of audio devices makes it easy to upgrade your device at a great price.' }
//{ name: 'Smartphone', image: '', desc: 'Our smartphone include all the big brands.' }
  const data = [
    { category: { name: 'Bag & Pounch', image: '', desc: 'Great fashion, great selections, great prices.' }, 
    sales: 15020, stock: 901, added: '29 Dec 2022', action: 'View - Edit - Delete' },
    { category: { name: 'Watch', image: '', desc: 'Our range of watches are perfect whether you’re looking to upgrade.' }, 
    sales: 4901, stock: 451, added: '29 Dec 2022', action: 'View - Edit - Delete' },
    { category: { name: 'Audio', image: '', desc: 'Our big range of audio devices makes it easy to upgrade your device at a great price.' }, 
    sales: 10405, stock: 400, added: '12 Dec 2022', action: 'View - Edit - Delete' },
    { category: { name: 'Smartphone', image: '', desc: 'Our smartphone include all the big brands.' }, 
    sales: 3245, stock: 132, added: '21 Oct 2022', action: 'View - Edit - Delete' },
    
  ];
  return (
    <div className="mx-6 my-8 ">
      <div className="flex justify-between mb-6">
        <div>
          <BreadCrumb />
        </div>
        <div className="flex gap-x-4 items-end ">
          <NormalButton
            color="bg-[#DEDEFA]"
            text="text-[#5C59E8] font-semibold text-sm"
            // size="min-w-[98px] max-w-[98px] min-h-10 max-h-10"
            type="submit"
            icon={<PiExportBold />}
            iconStyle="size-5"
          >
            Export
          </NormalButton>

          <LinkButton
            color="bg-[#5C59E8]"
            text="text-white font-semibold text-sm"
            // size="min-w-[147px] max-w-[147px] min-h-10 max-h-10"
            icon={<HiMiniPlus />}
            iconStyle="size-5"
            link="/admin/categories/add"
          >
            Add Category
          </LinkButton>
        </div>
      </div>

      <div className="flex justify-between mb-6">
        <SearchInput
          // color="bg-white"
          // border="border"
          size="min-w-[320px] max-w-[320px] "
          // text="text-neutral-400 font-normal text-sm"
          icon={<HiMiniMagnifyingGlass />}
          // iconStyle="size-5 text-neutral-500 "
          placeholder="Search category. . ."
          // placeholderText="placeholder:text-neutral-400"
          // type="text"
          name="categorySearch"
          required
        >
        </SearchInput>

        <NormalButton
          color="bg-white"
          border="border"
          text="text-neutral-500 font-medium text-sm"
          size="min-w-[98px] max-w-[98px] min-h-10 max-h-10"
          type="submit"
          icon={<HiMiniAdjustmentsHorizontal />}
          iconStyle="size-5"
        >
          Filters
        </NormalButton>
      </div>
      <div>
        <NormalTable columns={columns} data={data}>

        </NormalTable>

      </div>
      <div>
        
      </div>

    </div>
  );
}
