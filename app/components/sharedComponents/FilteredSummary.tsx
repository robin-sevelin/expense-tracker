import React from 'react';
import { useGetTransactions } from '../../hooks/useGetTransactions';
import { useGetFilteredSum } from '../../hooks/useGetfilteredSum';

const FilteredSummary = () => {
  const { sum, incomeSum, expenseSum } = useGetFilteredSum();
  useGetTransactions();
  return (
    <div>
      <ul className='flex bg-slate-100 p-5 gap-5'>
        <li>Remaning balance: {sum} kr</li>
        <li>Total incomes: {incomeSum} kr</li>
        <li>Total expenses {expenseSum} kr</li>
      </ul>
    </div>
  );
};

export default FilteredSummary;
