import { useAtom } from 'jotai';
import { submitAtom } from '../store/atoms';
import { useEffect, useState } from 'react';
import { useGetIncomes } from './useGetIncomes';

export const useGetIncomeSum = () => {
  const { incomes } = useGetIncomes();
  const [reccuringIncomesSum, setReccuringIncomesSum] = useState(0);
  const [isSubmitted, setIsSubmitted] = useAtom(submitAtom);

  useEffect(() => {
    if (incomes || isSubmitted) {
      const incomeSum = incomes.reduce((a, b) => a + b.amount, 0);
      setReccuringIncomesSum(incomeSum);
      setIsSubmitted(false);
    }
  }, [incomes, isSubmitted, setIsSubmitted]);

  return { reccuringIncomesSum } as const;
};
