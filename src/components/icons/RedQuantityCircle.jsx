import React from "react";

export default function RedQuantityCircle({item = {}, style= {}, position={}}) {
  return (
    <>
      {(item.qtt && item.qtt !== 0) ? (
        <div className={`${position} inset-0 ${style}`}>
      <div
        className="text-white px-1.5 py-0.5 font-semibold text-[10px] min-h-[18px] max-h-[18px] min-w-[18px] rounded-full 
        inline-flex items-center
        bg-red-500"
      >
        {item.qtt}
      </div>
    </div>
      ) : (
        <></>
      )}
    </>
    
  );
}
