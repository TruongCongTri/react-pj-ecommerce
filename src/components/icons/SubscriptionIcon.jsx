import React from "react";
import TableStatus from "./TableStatus"

export default function SubscriptionIcon({ item }) {
  return (
    <>
      {(() => {
          switch (item) {
            case 1:
              return (
                <TableStatus tittle="Premium" style="bg-[#EFEFFD]" text="text-[#5C59E8]" />
              );
            case 2:
              return (
                <TableStatus tittle="Blocked" style="bg-[#FEEDEC]" text="text-[#F04438]" />
              );
            default:
              return (
                <TableStatus tittle="Basic" style="bg-[#F0F1F3]" text="text-[#667085]" />
              );
          }
        })()}
    </>
  );
}
