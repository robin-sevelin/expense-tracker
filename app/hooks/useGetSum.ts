import { useEffect } from 'react';
import { TRANSACTION_TYPES } from '../constants/constants';
import { useAtom } from 'jotai';
import {
  balanceAtom,
  sumAtom,
  transactionsAtom,
  monthAtom,
} from '../store/atoms';

export const useGetSum = () => {
  const [transactions] = useAtom(transactionsAtom);
  const [balance] = useAtom(balanceAtom);
  const [sum, setSum] = useAtom(sumAtom);
  const [currentMonth] = useAtom(monthAtom);

  useEffect(() => {
    if (transactions) {
      const countSum = () => {
        const currentMonthTransactions = transactions.filter((transaction) => {
          const transactionDate = new Date(transaction.date);
          return (
            transactionDate.getMonth() === currentMonth.getMonth() &&
            transactionDate.getFullYear() === currentMonth.getFullYear()
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
      };

      countSum();
    }
  }, [balance, setSum, transactions, currentMonth]);

  return { sum } as const;
};
