import React from "react";

const InfoCard = ({ icon, label, color, value }) => {
  return (
    <div className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
      
      {/* Icon */}
      <div
        className={`w-14 h-14 flex items-center justify-center text-[24px] text-white ${color} rounded-xl`}
      >
        {icon}
      </div>

      {/* Content */}
      <div className="flex flex-col">
        <span className="text-sm text-gray-500 font-medium">
          {label}
        </span>
        <span className="text-xl font-semibold text-gray-900">
          ${value}
        </span>
      </div>
    </div>
  );
};

export default InfoCard;
