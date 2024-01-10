import { useEffect } from 'react';
import { ITransaction } from '../models/ITransaction';
import { TRANSACTION_TYPES } from '../constants/constants';
import { useAtom } from 'jotai';
import { balanceAtom, sumAtom } from '../store/atoms';

export const useGetSum = (transactions: ITransaction[]) => {
  const [balance] = useAtom(balanceAtom);
  const [sum, setSum] = useAtom(sumAtom);

  useEffect(() => {
    if (transactions.length !== 0) {
      const countSum = () => {
        const expenses = transactions.filter(
          (transaction) => transaction.type === TRANSACTION_TYPES.EXPENSE
        );
        const incomes = transactions.filter(
          (transaction) => transaction.type === TRANSACTION_TYPES.INCOME
        );

        const expenseSum = expenses.reduce((a, b) => a + b.amount, 0);
        const incomeSum = incomes.reduce((a, b) => a + b.amount, 0);
        const diffSum = incomeSum - expenseSum;

        setSum(diffSum + balance);
      };

      countSum();
    }
  }, [transactions, balance, setSum]);

  return { sum } as const;
};
