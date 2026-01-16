import React from "react";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-4 py-2 rounded-lg shadow-lg border border-gray-200">
        <p className="text-sm font-semibold text-gray-700">
          {payload[0].name}
        </p>

        <p className="mt-1 text-xs text-gray-500">
          Amount:{" "}
          <span className="font-semibold text-gray-900">
            ${payload[0].value}
          </span>
        </p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
