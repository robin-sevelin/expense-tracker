import React from 'react';
import { useGetTransactions } from '@/hooks/useGetTransactions';
import { useGetFilteredSum } from '@/hooks/useGetfilteredSum';
import { useGetRecurringExpenseSum } from '@/hooks/useGetRecurringExpenseSum';
import { useGetRecurringIncomeSum } from '@/hooks/useGetRecurringIncomeSum';

const FilteredSummary = () => {
  const { incomeSum, expenseSum, sum } = useGetFilteredSum();
  const { recurringExpenseSum } = useGetRecurringExpenseSum();
  const { recurringIncomeSum } = useGetRecurringIncomeSum();
  useGetTransactions();
  return (
    <div className='overflow-x-auto'>
      <table className='table'>
        <thead>
          <tr>
            <th>Type</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>One time incomes</th>
            <td>{incomeSum} kr</td>
          </tr>
          <tr>
            <th>Reccuring incomes</th>
            <td>{recurringIncomeSum} kr</td>
          </tr>
          <tr>
            <th>One time expenses</th>
            <td>{expenseSum} kr</td>
          </tr>
          <tr>
            <th>Reccuring expenses</th>
            <td>{recurringExpenseSum} kr</td>
          </tr>
          <tr>
            <th>Balance</th>
            <td>{sum} kr</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FilteredSummary;
