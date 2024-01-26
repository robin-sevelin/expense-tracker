import { balanceAtom, monthAtom, transactionsAtom } from '@/app/store/atoms';
import { useAtom } from 'jotai';
import { chartOptions } from '../constants/chartOptions';
import {
  DAYS_IN_MONTH,
  LINECHART_COLORS,
  TRANSACTION_TYPES,
} from '../constants/constants';
import { useGetFilteredTransactions } from './useGetFIlteredTransaction';
import { ITransaction } from '../models/ITransaction';
import { useAddReccuringToChart } from './useAddReccuringToChart';

export const useGetChartData = () => {
  const [transactions] = useAtom(transactionsAtom);
  const [balance] = useAtom(balanceAtom);
  const [currentMonth] = useAtom(monthAtom);
  const { filtredTransactions } = useGetFilteredTransactions(transactions);
  const { reccuringExpenses } = useAddReccuringToChart();

  const getSumByType = (day: number, type: string) =>
    getTransactionsUntilDay(day)
      ?.filter(
        (transaction: ITransaction) =>
          transaction.type === type &&
          new Date(transaction.date).getMonth() === currentMonth.getMonth() &&
          new Date(transaction.date).getFullYear() ===
            currentMonth.getFullYear()
      )
      .reduce((a, b) => a + b.amount, 0);

  const getTransactionsUntilDay = (day: number) => {
    const updatedTransactionList = filtredTransactions?.filter(
      (transaction) => {
        const transactionDate = transaction.date
          ? new Date(transaction.date)
          : null;

        return (
          transactionDate &&
          transactionDate.getDate() === day &&
          transactionDate.getMonth() === currentMonth.getMonth() &&
          transactionDate.getFullYear() === currentMonth.getFullYear()
        );
      }
    );

    return updatedTransactionList;
  };

  const labels = Array.from({ length: DAYS_IN_MONTH }, (_, index) => index + 1);
  const labelsIncome = labels.map((day) => ({
    x: day,
    y: getSumByType(day, TRANSACTION_TYPES.INCOME),
  }));
  const labelsExpense = labels.map((day) => ({
    x: day,
    y: getSumByType(day, TRANSACTION_TYPES.EXPENSE),
  }));

  let currentBalance = balance;
  const labelsBalance = labels.map((day) => {
    const incomeSum = getSumByType(day, TRANSACTION_TYPES.INCOME);
    const expenseSum = getSumByType(day, TRANSACTION_TYPES.EXPENSE);

    currentBalance = currentBalance + incomeSum - expenseSum;

    return { x: day, y: currentBalance };
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'Incomes',
        data: labelsIncome,
        borderColor: LINECHART_COLORS.INCOME.border,
        backgroundColor: LINECHART_COLORS.INCOME.bg,
      },
      {
        label: 'Expenses',
        data: labelsExpense,
        borderColor: LINECHART_COLORS.EXPENSE.border,
        backgroundColor: LINECHART_COLORS.EXPENSE.bg,
      },
      {
        label: 'Balance',
        data: labelsBalance,
        borderColor: LINECHART_COLORS.BALANCE.border,
        backgroundColor: LINECHART_COLORS.BALANCE.bg,
      },
    ],
  };

  return { data, chartOptions } as const;
};
