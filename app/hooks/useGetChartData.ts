import { filtredSumAtom, monthAtom } from '@/app/store/atoms';
import {
  CategoryScale,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';

import { Chart } from 'chart.js';
import { useAtom } from 'jotai';
import {
  DAYS_IN_MONTH,
  LINECHART_COLORS,
  TRANSACTION_TYPES,
} from '../constants/constants';
import { useGetTransactions } from './useGetTransactions';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'HEADING',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export const useGetChartData = () => {
  const { transactions } = useGetTransactions();
  const [sum] = useAtom(filtredSumAtom);
  const [currentMonth] = useAtom(monthAtom);

  const getSumByType = (day: number, type: string) =>
    getTransactionsUntilDay(day)
      ?.filter(
        (transaction) =>
          transaction.type === type &&
          new Date(transaction.date).getMonth() === currentMonth.getMonth() &&
          new Date(transaction.date).getFullYear() ===
            currentMonth.getFullYear()
      )
      .reduce((a, b) => a + b.amount, 0);

  const getTransactionsUntilDay = (day: number) => {
    const filteredTransactions = transactions?.filter((transaction) => {
      const transactionDate = transaction.date
        ? new Date(transaction.date)
        : null;

      return (
        transactionDate &&
        transactionDate.getDate() === day &&
        transactionDate.getMonth() === currentMonth.getMonth() &&
        transactionDate.getFullYear() === currentMonth.getFullYear()
      );
    });
    return filteredTransactions;
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

  let currentBalance = sum;
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

  return { data, options } as const;
};
