import { sumAtom, transactionsAtom, userAtom } from '@/app/store/atoms';
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

  const currentDate = new Date();
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const labels = Array.from({ length: daysInMonth }, (_, index) => index + 1);

  const data = {
    labels,
    datasets: [
      {
        label: 'Incomes',
        data: labels.map((day) => {
          const transactionsUntilDay = transactions.filter((transaction) => {
            const transactionDate = transaction.date
              ? new Date(transaction.date)
              : null;
            return transactionDate && transactionDate.getDate() <= day;
          });

          const incomeSum = transactionsUntilDay
            .filter(
              (transaction) => transaction.type === TRANSACTION_TYPES.INCOME
            )
            .reduce((acc, transaction) => acc + transaction.amount, 0);

          return { x: day, y: incomeSum };
        }),
        borderColor: 'rgb(0, 128, 0)',
        backgroundColor: 'rgba(0, 128, 0, 0.5)',
      },
      {
        label: 'Expenses',
        data: labels.map((day) => {
          const transactionsUntilDay = transactions.filter((transaction) => {
            const transactionDate = transaction.date
              ? new Date(transaction.date)
              : null;
            return transactionDate && transactionDate.getDate() <= day;
          });

          const expenseSum = transactionsUntilDay
            .filter(
              (transaction) => transaction.type === TRANSACTION_TYPES.EXPENSE
            )
            .reduce((acc, transaction) => acc + transaction.amount, 0);

          return { x: day, y: expenseSum };
        }),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Balance',
        data: labels.map((day) => {
          const transactionsUntilDay = transactions.filter((transaction) => {
            const transactionDate = transaction.date
              ? new Date(transaction.date)
              : null;
            return transactionDate && transactionDate.getDate() <= day;
          });

          const incomeSum = transactionsUntilDay
            .filter(
              (transaction) => transaction.type === TRANSACTION_TYPES.INCOME
            )
            .reduce((acc, transaction) => acc + transaction.amount, 0);

          const expenseSum = transactionsUntilDay
            .filter(
              (transaction) => transaction.type === TRANSACTION_TYPES.EXPENSE
            )
            .reduce((acc, transaction) => acc + transaction.amount, 0);

          const newBalance = balance + incomeSum - expenseSum;

          return { x: day, y: newBalance };
        }),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  return { data, options } as const;
};
