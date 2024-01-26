import { useAtom } from 'jotai';
import { monthAtom } from '../store/atoms';
import { ITransaction } from '../models/ITransaction';
import { DAYS_IN_MONTH, TRANSACTION_TYPES } from '../constants/constants';

export const useGetCalenderDays = (filteredTransactions: ITransaction[]) => {
  const [selectedMonth] = useAtom(monthAtom);

  let calenderArray = [];

  if (DAYS_IN_MONTH) {
    for (let i = 0; i < DAYS_IN_MONTH; i++) {
      const transactionsForDay = filteredTransactions.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        return (
          transactionDate.getDate() === i + 1 &&
          transactionDate.getMonth() === selectedMonth.getMonth() &&
          transactionDate.getFullYear() === selectedMonth.getFullYear()
        );
      });

      const incomeSum = transactionsForDay
        .filter((transaction) => transaction.type === TRANSACTION_TYPES.INCOME)
        .reduce((sum, transaction) => sum + transaction.amount, 0);

      const expenseSum = transactionsForDay
        .filter((transaction) => transaction.type === TRANSACTION_TYPES.EXPENSE)
        .reduce((sum, transaction) => sum + transaction.amount, 0);

      calenderArray.push({
        day: i + 1,
        incomeSum,
        expenseSum,
      });
    }
  }

  return { calenderArray } as const;
};
