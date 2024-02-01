import { useAtom } from 'jotai';
import { submitAtom } from '@/store/atoms';
import { useEffect, useState } from 'react';
import { useGetRecurringExpenses } from './useGetRecurringExpenses';

export const useGetExpenseSum = () => {
  const { recurringExpenses } = useGetRecurringExpenses();
  const [recurringExpenseSum, setReccuringExpensesSum] = useState(0);
  const [isSubmitted, setIsSubmitted] = useAtom(submitAtom);

  useEffect(() => {
    if (recurringExpenses || isSubmitted) {
      const expenseSum = recurringExpenses.reduce((a, b) => a + b.amount, 0);
      setReccuringExpensesSum(expenseSum);
      setIsSubmitted(false);
    }
  }, [recurringExpenses, setIsSubmitted, isSubmitted]);

  return { recurringExpenseSum } as const;
};
