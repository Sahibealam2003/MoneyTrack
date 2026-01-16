import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const CustomBarChart = ({ data, showXAxisTicks = true }) => {
  
  // Alternate bar colors
  const getBarColor = (index) => {
    return index % 2 === 0 ? "#875cf5" : "#cfbefb";
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
          <p className="text-xs font-semibold text-purple-800 mb-1">
            {payload[0].payload.day}
          </p>
          <p className="text-sm text-gray-600">
            Amount:{" "}
            <span className="font-semibold">
              ${payload[0].payload.amount}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart key={data.length} data={data}>
        <CartesianGrid stroke="none" />
        
        {/* XAxis controlled by prop */}
        <XAxis
          dataKey="day"
          stroke="#e5e7eb"
          tick={showXAxisTicks ? { fontSize: 12, fill: "#555" } : false}
        />
        
        <YAxis stroke="#e5e7eb" tick={{ fontSize: 12, fill: "#555" }} />
        
        <Tooltip
          content={<CustomTooltip />}
          wrapperStyle={{ backgroundColor: "transparent", boxShadow: "none" }}
        />
        
        <Bar
          dataKey="amount"
          radius={[10, 10, 0, 0]}
          isAnimationActive
          animationDuration={1200}
          animationEasing="ease-out"
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={getBarColor(index)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;
