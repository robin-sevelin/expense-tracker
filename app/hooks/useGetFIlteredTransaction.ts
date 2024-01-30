import { useAtom } from 'jotai';
import { monthAtom } from '../store/atoms';
import { ITransaction } from '../models/ITransaction';
import { useEffect, useState } from 'react';
import { TRANSACTIONS_BASE_VALUES } from '../constants/constants';

export const useGetFilteredTransactions = (transactions: ITransaction[]) => {
  const [currentMonth] = useAtom(monthAtom);
  const [filtredTransactions, setFiltredTransactions] = useState(
    TRANSACTIONS_BASE_VALUES
  );

  useEffect(() => {
    if (transactions) {
      console.log('hämtar filter trans');

      const filterTransactions = () => {
        const transactionToBeFiltred = transactions
          ? transactions.filter((transaction) => {
              const transactionDate = new Date(transaction.date);

              return (
                +transactionDate.getMonth() === currentMonth.getMonth() &&
                +transactionDate.getFullYear() === currentMonth.getFullYear()
              );
            })
          : null;

        setFiltredTransactions(transactionToBeFiltred as ITransaction[]);
      };
      filterTransactions();
    }
  }, [currentMonth, transactions]);

  return { filtredTransactions } as const;
};
