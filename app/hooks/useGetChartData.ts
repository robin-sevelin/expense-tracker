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
import { transactionsAtom } from '../store/atoms';
import { TRANSACTION_TYPES } from '../constants/constants';
import { useGetSum } from './useGetSum';
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

export const useGetChartData = () => {
  const { transactions } = useGetTransactions();
  const { sum } = useGetSum();

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Balance Over Time',
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
        label: 'Balance',
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

          const balance = sum - expenseSum;

          return { x: day, y: balance };
        }),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  return { data, options } as const;
};
