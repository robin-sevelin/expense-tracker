import React from 'react';
import { useGetTransactions } from '../../hooks/useGetTransactions';
import { useGetFilteredSum } from '../../hooks/useGetfilteredSum';

const FilteredSummary = () => {
  const { sum, incomeSum, expenseSum } = useGetFilteredSum();
  useGetTransactions();
  return (
    <div className='w-96 m-auto flex  justify-center'>
      <ul className='flex '>
        <li>
          <h3 className='font-bold'>Incomes</h3>
          <p>{incomeSum} kr</p>
        </li>
        <li>
          <h3 className='font-bold'>Expenses</h3>
          <p>{expenseSum} kr</p>
        </li>
        <li>
          <h3 className='font-bold'>Balance</h3>
          <p>{sum} kr</p>
        </li>
      </ul>
    </div>
  );
};

export default FilteredSummary;
