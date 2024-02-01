import React from 'react';
import { render } from '@testing-library/react';
import { useGetChartData as mockUseGetChartData } from '@/hooks/useGetChartData';
import ChartPage from '@/components/chartPage/ChartPage';
import { chartOptions } from '@/constants/chartOptions';

const chartData = jest.mock('@/hooks/useGetChartData');

(mockUseGetChartData as jest.Mock).mockReturnValue({
  chartOptions: {
    chartOptions,
  },
  data: {
    chartData,
  },
});

test('renders ChartPage component', () => {
  const { getByText } = render(<ChartPage />);

  expect(getByText('CHART')).toBeInTheDocument();
});
