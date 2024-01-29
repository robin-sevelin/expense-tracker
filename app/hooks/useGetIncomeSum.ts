import { useAtom } from 'jotai';
import { submitAtom } from '../store/atoms';
import { useEffect, useState } from 'react';
import { useGetReccuringIncomes } from './useGetReccuringIncomes';

export const useGetIncomeSum = () => {
  const { reccuringIncomes } = useGetReccuringIncomes();
  const [reccuringIncomesSum, setReccuringIncomesSum] = useState(0);
  const [isSubmitted, setIsSubmitted] = useAtom(submitAtom);

  useEffect(() => {
    if (reccuringIncomes || isSubmitted) {
      const incomeSum = reccuringIncomes.reduce((a, b) => a + b.amount, 0);
      setReccuringIncomesSum(incomeSum);
      setIsSubmitted(false);
    }
  }, [reccuringIncomes, isSubmitted, setIsSubmitted]);

  return { reccuringIncomesSum } as const;
};
