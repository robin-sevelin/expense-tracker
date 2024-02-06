import { Title, Tooltip, Legend, Chart, ArcElement } from 'chart.js';

const pieChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'TRANSACTIONS',
    },
  },
};

export const PIECHART_COLORS = {
  INCOME: {
    bg: 'rgba(0, 128, 0, 0.5)',
  },
  EXPENSE: {
    bg: 'rgba(255, 99, 132, 0.5)',
  },
  RECCURING_EXPENSES: {
    bg: 'rgb(154, 30, 166)',
  },
  RECCURING_INCOMES: {
    bg: 'rgb(87, 87, 186)',
  },
};

Chart.register(ArcElement, Title, Tooltip, Legend);

export { pieChartOptions };
