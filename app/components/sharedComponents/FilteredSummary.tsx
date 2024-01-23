import React from 'react';
import { useGetTransactions } from '../../hooks/useGetTransactions';
import { useGetFilteredSum } from '../../hooks/useGetfilteredSum';

const FilteredSummary = () => {
  const { sum, incomeSum, expenseSum } = useGetFilteredSum();
  useGetTransactions();
  return (
    <div>
      <ul className='flex p-5 gap-3 w-3/4 m-auto items-center'>
        <li>Balance {sum} kr</li>
        <li>Incomes {incomeSum} kr</li>
        <li>Expenses {expenseSum} kr</li>
      </ul>
    </div>
  );
};

export default FilteredSummary;
