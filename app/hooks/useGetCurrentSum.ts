import { useEffect, useState } from 'react';
import {
  CURRENT_MONTH,
  CURRENT_YEAR,
  TRANSACTION_TYPES,
} from '../constants/constants';
import { useAtom } from 'jotai';
import {
  recurringTransactionAtom,
  submitAtom,
  sumAtom,
  transactionsAtom,
} from '../store/atoms';

import { useGetRecurringExpenseSum } from './useGetRecurringExpenseSum';
import { useGetBalance } from './useGetBalance';
import { useGetRecurringIncomeSum } from './useGetRecurringIncomeSum';

export const useGetCurrentSum = () => {
  const [recurringTransactions] = useAtom(recurringTransactionAtom);
  const [transactions] = useAtom(transactionsAtom);
  const [sum, setSum] = useAtom(sumAtom);
  const [isSubmitted, setIsSubmitted] = useAtom(submitAtom);
  const [dataFetched, setDataFetched] = useState(false);
  const { balance } = useGetBalance();
  const { recurringIncomeSum } = useGetRecurringIncomeSum();
  const { recurringExpenseSum } = useGetRecurringExpenseSum();

  useEffect(() => {
    if (isSubmitted || !dataFetched || balance) {
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
        incomeSum - expenseSum - recurringExpenseSum + recurringIncomeSum;

      setSum(diffSum + balance);
      setIsSubmitted(false);
      setDataFetched(true);
    }
  }, [
    balance,
    setSum,
    transactions,
    recurringTransactions,
    recurringExpenseSum,
    recurringIncomeSum,
    isSubmitted,
    dataFetched,
    setIsSubmitted,
    sum,
  ]);

  return { sum } as const;
};
