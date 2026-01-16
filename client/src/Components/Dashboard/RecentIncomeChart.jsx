import React, { useEffect, useState } from 'react';
import CustomPieChart from '../Chart/CustomPieChart';

const COLORS = ["#875CF5","#FA2C37","#FF6900","#4F39F6"];

const RecentIncomeChart = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
  if (!data) return;

  const aggregation = data
    .filter(item => item.amount > 0)
    .reduce((acc, item) => {
      const key = item.source || "Other";
      acc[key] = (acc[key] || 0) + item.amount;
      return acc;
    }, {});

  const preparedData = Object.keys(aggregation).map(key => ({
    name: key,
    amount: aggregation[key],
  }));

  setChartData(preparedData);
}, [data]);

  return (
    <div className="card w-full">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 60 Days Income</h5>
      </div>

      <div className="w-full h-95">
        <CustomPieChart
          data={chartData}
          label="Total Income"
          totalAmount={`$${totalIncome}`}   
          showTextAnchor
          colors={COLORS}
        />
      </div>
    </div>
  );
};

export default RecentIncomeChart;
