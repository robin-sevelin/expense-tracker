import { useAtom } from 'jotai';
import { recurringExpenseSumAtom, submitAtom } from '@/store/atoms';
import { useEffect, useState } from 'react';
import { useGetRecurringTransactions } from './useGetRecurringTransactions';

export const useGetRecurringExpenseSum = () => {
  const { recurringTransactions } = useGetRecurringTransactions();
  const [recurringExpenseSum, setReccuringExpensesSum] = useAtom(
    recurringExpenseSumAtom
  );
  const [isSubmitted, setIsSubmitted] = useAtom(submitAtom);

  useEffect(() => {
    if (recurringTransactions || isSubmitted) {
      const expenses = recurringTransactions.filter(
        (transaction) => transaction.type === 'expense'
      );
      const expenseSum = expenses.reduce((a, b) => a + b.amount, 0);
      setReccuringExpensesSum(expenseSum);
      setIsSubmitted(false);
    }
  }, [recurringTransactions, setIsSubmitted, isSubmitted]);

  return { recurringExpenseSum } as const;
};
