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

import { useGetBalance } from './useGetBalance';
import { useAtom } from 'jotai';
import { balanceAtom } from '../store/atoms';

export const useGetChartData = () => {
  const [balance] = useAtom(balanceAtom);
  useGetBalance();

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
        text: 'Chart.js Line Chart',
      },
    },
  };

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const numberOfDaysInMonth = new Date(
    currentYear,
    currentMonth + 1,
    0
  ).getDate();

  const labels = Array.from(
    { length: numberOfDaysInMonth },
    (_, index) => index + 1
  );
  const yAxisData = Array.from(
    { length: 10 },
    (_, index) => (index / 9) * balance
  );

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: yAxisData.map((value) => ({ y: value })),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return { data, options } as const;
};
