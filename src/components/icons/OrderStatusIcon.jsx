import React from "react";
import TableStatus from "./TableStatus"

export default function ProductStatusIcon({ item }) {
  return (
    <>
      {(() => {
          switch (item) {
            case 1:
              return (
                <TableStatus tittle="Processing" style="bg-[#FDF1E8]" text="text-[#E46A11]" />
              );
            case 2:
              return (
                <TableStatus tittle="Shiped" style="bg-[#E8F8FD]" text="text-[#13B2E4]" />
              );
            case 3:
              return (
                <TableStatus tittle="Delivered" style="bg-[#E7F4EE]" text="text-[#0D894F]" />
              );
            case 4:
              return (
                <TableStatus tittle="Cancelled" style="bg-[#FEEDEC]" text="text-[#F04438]" />
              );
            default:
              return (
                <TableStatus tittle="Draft" style="bg-[#F0F1F3]" text="text-[#667085]" />
              );
          }
        })()}
    </>
  );
}
