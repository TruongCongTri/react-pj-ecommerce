import React from "react";
import TableStatus from "../icons/TableStatus";

export default function PercentageIcon({ item = {} }) {
  return (
    <>
      {(() => {
        if (item < 0) {
          return (
            <TableStatus
              tittle={`${item} %`}
              style="bg-[#FEEDEC]"
              text="text-[#F04438]"
            />
          );
        } else if (item == 0) {
          return (
            <TableStatus
              tittle={`${item} %`}
              style="bg-[#F0F1F3]"
              text="text-[#667085]"
            />
          );
        } else {
          return (
            <TableStatus
              tittle={`${item} %`}
              style="bg-[#E7F4EE]"
              text="text-[#0D894F]"
            />
          );
        }
      })()}
    </>
  );
}
