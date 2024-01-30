import { useAtom } from 'jotai';
import { reccuringExpenseAtom, submitAtom } from '../store/atoms';
import { useEffect, useState } from 'react';

export const useGetExpenseSum = () => {
  const [recurringExpenses] = useAtom(reccuringExpenseAtom);
  const [recurringExpenseSum, setReccuringExpensesSum] = useState(0);
  const [isSubmitted, setIsSubmitted] = useAtom(submitAtom);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    if (!recurringExpenses || isSubmitted || !dataFetched) {
      console.log('hämtar get expense sum');

      const expenseSum = recurringExpenses.reduce((a, b) => a + b.amount, 0);
      setReccuringExpensesSum(expenseSum);
      setIsSubmitted(false);
      setDataFetched(true);
    }
  }, [recurringExpenses, setIsSubmitted, isSubmitted, dataFetched]);

  return { recurringExpenseSum } as const;
};
