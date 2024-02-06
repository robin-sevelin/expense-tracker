'use client';

import React from 'react';
import FilteredSummary from '@/components/sharedComponents/FilteredSummary';
import MonthPicker from '@/components/sharedComponents/MonthPicker';
import { Line, Pie } from 'react-chartjs-2';
import { useGetChartData } from '@/hooks/useGetChartData';
import Loading from '../sharedComponents/Loading';
import { useAuthUser } from '@/hooks/useAuthUser';
import { useGetPieChartData } from '@/hooks/useGetPieChartData';
import MediaQuery from 'react-responsive';

const ChartPage = () => {
  const { chartOptions, data } = useGetChartData();
  const { pieChartData, pieChartOptions } = useGetPieChartData();
  useAuthUser();

  if (!data) {
    return <Loading />;
  }
  return (
    <>
      <MonthPicker />
      <FilteredSummary />
      <MediaQuery minWidth={1225}>
        <Line options={chartOptions} data={data} />
      </MediaQuery>
      <MediaQuery maxWidth={1224}>
        <Pie options={pieChartOptions} data={pieChartData} />
      </MediaQuery>
    </>
  );
};

export default ChartPage;
