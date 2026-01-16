import moment from 'moment';
import React from 'react'
import { LuArrowRight } from 'react-icons/lu';
import TransactionInfoCard from '../../Components/Cards/TransactionInfoCard';

const ExpenseTransactions = ({onSeeMore,transactions}) => {
    
    
  return (
  <div className="card">
    <div className="flex items-center justify-between">
      <h5 className="text-lg">Expenses</h5>

      <button
        className="card-btn flex items-center gap-1"
        onClick={onSeeMore}
      >
        See All
        <LuArrowRight className="text-base" />
      </button>
    </div>
    <div className="mt-6 flex flex-col gap-4">
  {transactions?.slice(0, 4)?.map((item) => (
    <TransactionInfoCard
      key={item._id}
      title={item.type === "expense" ? item.category : item.source}
      icon={item.icon}
      date={moment(item.date).format("Do MMM YYYY")}
      amount={item.amount}
      type={item.type}
      hideDeleteBtn
    />
  ))}
</div>


  </div>
);

}

export default ExpenseTransactions