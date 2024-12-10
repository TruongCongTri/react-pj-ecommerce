import React, { useEffect, useState } from "react";

export default function GreenActiveCircle({ status = {} }) {
  const [timeOfDay, setTimeOfDay] = useState();
  useEffect(() => {
    setTimeOfDay(status.id);
  }, [status]);

  const renderGreeting = () => {
    switch (timeOfDay) {
      case 1:
        return (
          <div className="size-[12px] rounded-full inline-flex bg-green-400 border-[2px] border-white"></div>
        );
      case 2:
        return (
          <div className="size-[12px] rounded-full inline-flex bg-yellow-400 border-[2px] border-white"></div>
        );
      case 3:
        return (
          <div className="size-[12px] rounded-full inline-flex bg-red-400 border-[2px] border-white"></div>
        );
      case 4:
        return (
          <div className="size-[12px] rounded-full inline-flex bg-white border-[2px] border-gray-900"></div>
        );
      default:
        return (
          <div className="size-[12px] rounded-full inline-flex bg-white border-[2px] border-gray-50"></div>
        );
    }
  };

  return (
    <div className="absolute inset-0 object-right-top -mr-[24px] mt-[16px]">
      {renderGreeting()}
    </div>
  );
}
