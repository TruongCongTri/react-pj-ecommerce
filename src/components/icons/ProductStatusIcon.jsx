import React from "react";
import TableStatus from "./TableStatus"

export default function ProductStatusIcon({ item }) {
  return (
    <>
      {(() => {
          switch (item) {
            case 1:
              return (
                <TableStatus tittle="Published" style="bg-[#E7F4EE]" text="text-[#0D894F]" />
              );
            case 2:
              return (
                <TableStatus tittle="Low Stock" style="bg-[#FDF1E8]" text="text-[#E46A11]" />
              );
            case 3:
              return (
                <TableStatus tittle="Out of Stock" style="bg-[#FEEDEC]" text="text-[#F04438]" />
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
