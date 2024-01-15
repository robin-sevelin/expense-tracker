import { useEffect } from 'react';
import { ITransaction } from '../models/ITransaction';
import { TRANSACTION_TYPES } from '../constants/constants';
import { useAtom } from 'jotai';
import { balanceAtom, sumAtom, transactionsAtom } from '../store/atoms';

export const useGetSum = () => {
  const [transactions] = useAtom(transactionsAtom);
  const [balance] = useAtom(balanceAtom);
  const [, setSum] = useAtom(sumAtom);

  useEffect(() => {
    if (transactions) {
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
  }, [balance, setSum, transactions]);
};
