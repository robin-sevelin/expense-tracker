import { useAtom } from 'jotai';
import { submitAtom } from '../store/atoms';
import { useEffect, useState } from 'react';
import { useGetRecurringIncomes } from './useGetRecurringIncomes';

export const useGetIncomeSum = () => {
  const { recurringIncomes } = useGetRecurringIncomes();
  const [recurringIncomeSum, setReccuringIncomesSum] = useState(0);
  const [isSubmitted, setIsSubmitted] = useAtom(submitAtom);

  useEffect(() => {
    if (recurringIncomes || isSubmitted) {
      const incomeSum = recurringIncomes.reduce((a, b) => a + b.amount, 0);
      setReccuringIncomesSum(incomeSum);
      setIsSubmitted(false);
    }
  }, [recurringIncomes, isSubmitted, setIsSubmitted]);

  return { recurringIncomeSum } as const;
};
