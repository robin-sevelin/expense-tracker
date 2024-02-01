'use client';

import React from 'react';
import FilteredSummary from '@/components/sharedComponents/FilteredSummary';
import MonthPicker from '@/components/sharedComponents/MonthPicker';
import { Line } from 'react-chartjs-2';
import { useGetChartData } from '@/hooks/useGetChartData';

const ChartPage = () => {
  const { chartOptions, data } = useGetChartData();

  return (
    <section className='w-full'>
      <h2 className='text-5xl font-bold text-center'>CHART</h2>
      <MonthPicker />
      <FilteredSummary />
      <Line options={chartOptions} data={data} />
    </section>
  );
};

export default ChartPage;
