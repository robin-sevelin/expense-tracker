import { useAtom } from 'jotai';
import { reccuringExpenseAtom, submitAtom } from '../store/atoms';
import { useEffect, useState } from 'react';

export const useGetExpenseSum = () => {
  const [recurringExpenses] = useAtom(reccuringExpenseAtom);
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
