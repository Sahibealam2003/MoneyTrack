import React, { useEffect, useState } from "react";
import CustomBarChart from "../Chart/CustomBarChart";
import { LuPlus } from "react-icons/lu";
import { prepareIncomeBarChartData } from "../../Utils/helper";

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);


  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);
    setChartData(result);

    return () => {};
  }, [transactions]);

  return (
    <div className="card">
       <div className="flex items-center justify-between">
    <div>
      <h5 className="text-lg font-semibold text-gray-800">
        Income Overview
      </h5>
      <p className="text-sm text-gray-500 mt-1">
        Track your earnings over time and analyze your income sources.
      </p>
    </div>

    <button
      onClick={onAddIncome}
      className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
    >
      <LuPlus className="text-base" />
      Add Income
    </button>
  </div>

      <div className="mt-10">
        <CustomBarChart data={chartData} showXAxisTicks={true} />

      </div>
    </div>
  );
};

export default IncomeOverview;
