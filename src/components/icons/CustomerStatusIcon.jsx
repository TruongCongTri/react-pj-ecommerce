import React from "react";
import TableStatus from "./TableStatus"

export default function CustomerStatusIcon({ item }) {
  return (
    <>
      {(() => {
          switch (item) {
            case 1:
              return (
                <TableStatus tittle="Active" style="bg-[#E7F4EE]" text="text-[#0D894F]" />
              );
            case 2:
              return (
                <TableStatus tittle="Blocked" style="bg-[#FEEDEC]" text="text-[#F04438]" />
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
