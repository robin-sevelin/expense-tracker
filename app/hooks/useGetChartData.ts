import { balanceAtom, sumAtom, userAtom } from '@/app/store/atoms';
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
  CURRENT_MONTH,
  CURRENT_YEAR,
  DAYS_IN_MONTH,
  LINECHART_COLORS,
  TRANSACTION_TYPES,
} from '../constants/constants';
import { useGetTransactions } from './useGetTransactions';
import { useGetBalance } from './useGetBalance';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const useGetChartData = () => {
  const [user] = useAtom(userAtom);
  const { transactions } = useGetTransactions();
  const { balance } = useGetBalance();
  const HEADING = `${user.displayName}'s transaction stats: ${CURRENT_MONTH} ${CURRENT_YEAR} in SEK`;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: HEADING,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const getSumByType = (day: number, type: string) =>
    getTransactionsUntilDay(day)
      ?.filter((transaction) => transaction.type === type)
      .reduce((a, b) => a + b.amount, 0);

  const getTransactionsUntilDay = (day: number) => {
    const filteredTransactions = transactions.filter((transaction) => {
      const transactionDate = transaction.date
        ? new Date(transaction.date)
        : null;

      return transactionDate && transactionDate.getDate() === day;
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

  return { data, options } as const;
};
