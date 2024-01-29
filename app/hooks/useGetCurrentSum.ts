import { useEffect, useState } from 'react';
import {
  CURRENT_MONTH,
  CURRENT_YEAR,
  TRANSACTION_TYPES,
} from '../constants/constants';
import { useAtom } from 'jotai';
import {
  balanceAtom,
  reccuringExpenseAtom,
  reccuringIncomeAtom,
  sumAtom,
  transactionsAtom,
} from '../store/atoms';
import { useGetExpenseSum } from './useGetExpenseSum';
import { useGetIncomeSum } from './useGetIncomeSum';

export const useGetCurrentSum = () => {
  const [reccuringIncomes] = useAtom(reccuringIncomeAtom);
  const [reccuringExpenses] = useAtom(reccuringExpenseAtom);
  const [transactions] = useAtom(transactionsAtom);
  const [balance] = useAtom(balanceAtom);
  const [sum, setSum] = useAtom(sumAtom);
  const { reccuringExpensesSum } = useGetExpenseSum();
  const { reccuringIncomesSum } = useGetIncomeSum();

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
      const diffSum =
        incomeSum - expenseSum - reccuringExpensesSum + reccuringIncomesSum;

      setSum(diffSum + balance);
      setIsLoading(false);
    }
  }, [
    balance,
    setSum,
    transactions,
    reccuringExpenses,
    reccuringIncomes,
    reccuringExpensesSum,
    reccuringIncomesSum,
  ]);

  return { sum, isLoading } as const;
};
