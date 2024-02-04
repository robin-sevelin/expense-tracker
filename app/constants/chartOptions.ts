import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Chart,
} from 'chart.js';

const chartOptions = {
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

export const LINECHART_COLORS = {
  INCOME: {
    border: 'rgb(0, 128, 0)',
    bg: 'rgba(0, 128, 0, 0.5)',
  },
  EXPENSE: {
    border: 'rgb(255, 99, 132)',
    bg: 'rgba(255, 99, 132, 0.5)',
  },
  BALANCE: {
    border: 'rgb(75, 192, 192)',
    bg: 'rgba(75, 192, 192, 0.5)',
  },
  RECCURING_EXPENSES: {
    border: 'rgb(235, 82, 52)',
    bg: 'rgb(154, 30, 166)',
  },
  RECCURING_INCOMES: {
    border: 'rgb(52, 52, 2352)',
    bg: 'rgb(87, 87, 186)',
  },
};

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export { chartOptions };
