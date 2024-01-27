import { useAtom } from 'jotai';
import { submitAtom } from '../store/atoms';
import { useEffect, useState } from 'react';
import { useGetReccuringExpenses } from './useGetReccuringExpenses';

export const useGetExpenseSum = () => {
  const { reccuringExpenses } = useGetReccuringExpenses();
  const [reccuringExpensesSum, setReccuringExpensesSum] = useState(0);
  const [isSubmitted, setIsSubmitted] = useAtom(submitAtom);

  useEffect(() => {
    if (reccuringExpenses || isSubmitted) {
      const expenseSum = reccuringExpenses.reduce((a, b) => a + b.amount, 0);
      setReccuringExpensesSum(expenseSum);
      setIsSubmitted(false);
    }
  }, [reccuringExpenses, setIsSubmitted, isSubmitted]);

  return { reccuringExpensesSum } as const;
};
