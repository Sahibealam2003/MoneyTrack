import React, { useEffect, useState } from "react";
import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import { BeatLoader } from "react-spinners";

const RecentTransctions = ({ transactions, onSeeMore, loading }) => {
  const hasTransactions = transactions && transactions.length > 0;
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (loading) {
      setShowLoader(true);
    } else {
      const timer = setTimeout(() => setShowLoader(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [loading]);
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Recent Transactions</h5>

        {hasTransactions && (
          <button
            className="card-btn flex items-center gap-1"
            onClick={onSeeMore}
          >
            See All
            <LuArrowRight className="text-base" />
          </button>
        )}
      </div>

      {showLoader ? (
        <div className="flex justify-center mt-30  h-40">
          <BeatLoader color="#7C3AED" size={20} />
        </div>
      ) : (
        <div className="mt-6 flex flex-col gap-4">
          {hasTransactions ? (
            transactions
              .slice(0, 4)
              .map((item) => (
                <TransactionInfoCard
                  key={item._id}
                  title={item.type === "expense" ? item.category : item.source}
                  icon={item.icon}
                  date={moment(item.date).format("Do MMM YYYY")}
                  amount={item.amount}
                  type={item.type}
                  hideDeleteBtn
                />
              ))
          ) : (
            <p className="text-sm text-gray-500 text-center py-6">
              No transactions done yet
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default RecentTransctions;
