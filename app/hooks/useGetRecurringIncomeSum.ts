import { useAtom } from 'jotai';
import { recurringIncomeSumAtom, submitAtom } from '@/store/atoms';
import { useEffect } from 'react';
import { useGetRecurringTransactions } from './useGetRecurringTransactions';
import { TRANSACTION_TYPES } from '@/constants/constants';

export const useGetRecurringIncomeSum = () => {
  const { recurringTransactions } = useGetRecurringTransactions();
  const [recurringIncomeSum, setReccuringIncomeSum] = useAtom(
    recurringIncomeSumAtom
  );
  const [isSubmitted, setIsSubmitted] = useAtom(submitAtom);

  useEffect(() => {
    if (recurringTransactions || isSubmitted) {
      const incomes = recurringTransactions.filter(
        (transaction) => transaction.type === TRANSACTION_TYPES.INCOME
      );
      const incomeSum = incomes.reduce((a, b) => a + b.amount, 0);
      setReccuringIncomeSum(incomeSum);
      setIsSubmitted(false);
    }
  }, [recurringTransactions, isSubmitted, setIsSubmitted]);

  return { recurringIncomeSum } as const;
};
