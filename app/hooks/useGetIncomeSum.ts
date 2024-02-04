import { useAtom } from 'jotai';
import { submitAtom } from '@/store/atoms';
import { useEffect, useState } from 'react';
import { useGetRecurringTransactions } from './useGetRecurringTransactions';

export const useGetIncomeSum = () => {
  const { recurringTransactions } = useGetRecurringTransactions();
  const [recurringIncomeSum, setReccuringIncomesSum] = useState(0);
  const [isSubmitted, setIsSubmitted] = useAtom(submitAtom);

  useEffect(() => {
    if (recurringTransactions || isSubmitted) {
      const incomes = recurringTransactions.filter(
        (transaction) => transaction.type === 'income'
      );
      const incomeSum = incomes.reduce((a, b) => a + b.amount, 0);
      setReccuringIncomesSum(incomeSum);
      setIsSubmitted(false);
    }
  }, [recurringTransactions, isSubmitted, setIsSubmitted]);

  return { recurringIncomeSum } as const;
};
