import { useAtom } from 'jotai';
import { submitAtom } from '../store/atoms';
import { useEffect, useState } from 'react';
import { useGetExpenses } from './useGetExpenses';

export const useGetExpenseSum = () => {
  const { expenses } = useGetExpenses();
  const [reccuringExpensesSum, setReccuringExpensesSum] = useState(0);
  const [isSubmitted, setIsSubmitted] = useAtom(submitAtom);

  useEffect(() => {
    if (expenses || isSubmitted) {
      const expenseSum = expenses.reduce((a, b) => a + b.amount, 0);
      setReccuringExpensesSum(expenseSum);
      setIsSubmitted(false);
    }
  }, [expenses, setIsSubmitted, isSubmitted]);

  return { reccuringExpensesSum } as const;
};
