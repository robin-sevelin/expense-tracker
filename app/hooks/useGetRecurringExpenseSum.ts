import { useAtom } from 'jotai';
import { recurringExpenseSumAtom, submitAtom } from '@/store/atoms';
import { useEffect, useState } from 'react';
import { useGetRecurringTransactions } from './useGetRecurringTransactions';
import { TRANSACTION_TYPES } from '@/constants/constants';

export const useGetRecurringExpenseSum = () => {
  const { recurringTransactions } = useGetRecurringTransactions();
  const [recurringExpenseSum, setReccuringExpensesSum] = useAtom(
    recurringExpenseSumAtom
  );
  const [isSubmitted, setIsSubmitted] = useAtom(submitAtom);

  useEffect(() => {
    if (recurringTransactions || isSubmitted) {
      const expenses = recurringTransactions.filter(
        (transaction) => transaction.type === TRANSACTION_TYPES.EXPENSE
      );
      const expenseSum = expenses.reduce((a, b) => a + b.amount, 0);
      setReccuringExpensesSum(expenseSum);
      setIsSubmitted(false);
    }
  }, [recurringTransactions, setIsSubmitted, isSubmitted]);

  return { recurringExpenseSum } as const;
};
