import React from 'react';
import { useGetTransactions } from '../../hooks/useGetTransactions';
import { useGetFilteredSum } from '../../hooks/useGetfilteredSum';
import { useGetExpenseSum } from '@/app/hooks/useGetExpenseSum';
import { useGetIncomeSum } from '@/app/hooks/useGetIncomeSum';
import { useGetCurrentSum } from '@/app/hooks/useGetCurrentSum';

const FilteredSummary = () => {
  const { incomeSum, expenseSum } = useGetFilteredSum();
  const { sum } = useGetCurrentSum();
  const { reccuringExpensesSum } = useGetExpenseSum();
  const { reccuringIncomesSum } = useGetIncomeSum();
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
            <td>{reccuringIncomesSum} kr</td>
          </tr>
          <tr>
            <th>One time expenses</th>
            <td>{expenseSum} kr</td>
          </tr>
          <tr>
            <th>Reccuring expenses</th>
            <td>{reccuringExpensesSum} kr</td>
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
