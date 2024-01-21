import { useEffect } from 'react';
import { TRANSACTION_TYPES } from '../constants/constants';
import { useAtom } from 'jotai';
import { balanceAtom, sumAtom, transactionsAtom } from '../store/atoms';

export const useGetCurrentSum = () => {
  const [transactions] = useAtom(transactionsAtom);
  const [balance] = useAtom(balanceAtom);
  const [sum, setSum] = useAtom(sumAtom);

  useEffect(() => {
    if (transactions) {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();

      const currentMonthTransactions = transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        return (
          transactionDate.getMonth() === currentMonth &&
          transactionDate.getFullYear() === currentYear
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
    }
  }, [balance, setSum, transactions]);

  return { sum } as const;
};