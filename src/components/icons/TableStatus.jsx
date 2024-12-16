import React from "react";

export default function TableStatus({style, text, tittle}) {
  return (
    <div
      className={`px-3 py-3 font-semibold text-sm min-h-[18px] max-h-[18px] min-w-[18px] rounded-full 
            inline-flex items-center
            ${style} ${text}`}
    >
      {tittle}
    </div>
  );
}
