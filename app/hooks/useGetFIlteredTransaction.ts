import { useAtom } from 'jotai';
import { monthAtom, transactionsAtom } from '../store/atoms';

export const useGetFilteredTransactions = () => {
  const [transactions] = useAtom(transactionsAtom);
  const [currentMonth] = useAtom(monthAtom);

  const filteredTransactions = transactions
    ? transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.date);

        return (
          +transactionDate.getMonth() === currentMonth.getMonth() &&
          +transactionDate.getFullYear() === currentMonth.getFullYear()
        );
      })
    : null;

  return { filteredTransactions } as const;
};
