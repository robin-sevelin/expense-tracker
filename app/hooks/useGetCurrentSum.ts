import { useEffect, useState } from 'react';
import {
  CURRENT_MONTH,
  CURRENT_YEAR,
  TRANSACTION_TYPES,
} from '../constants/constants';
import { useAtom } from 'jotai';
import { balanceAtom, sumAtom, transactionsAtom } from '../store/atoms';

export const useGetCurrentSum = () => {
  const [transactions] = useAtom(transactionsAtom);
  const [balance] = useAtom(balanceAtom);
  const [sum, setSum] = useAtom(sumAtom);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (transactions) {
      const currentMonthTransactions = transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        return (
          transactionDate.getMonth() === CURRENT_MONTH &&
          transactionDate.getFullYear() === CURRENT_YEAR
        );
      });

      const expenses = currentMonthTransactions.filter(
        (transaction) => transaction.type === TRANSACTION_TYPES.EXPENSE
      );
      const incomes = currentMonthTransactions.filter(
        (transaction) => transaction.type === TRANSACTION_TYPES.INCOME
      );

      const expenseSum = expenses.reduce((a, b) => a + b.amount, 0);
      const incomeSum = incomes.reduce((a, b) => a + b.amount, 0);
      const diffSum = incomeSum - expenseSum;

      setSum(diffSum + balance);
      setIsLoading(false);
    }
  }, [balance, setSum, transactions]);

  return { sum, isLoading } as const;
};
