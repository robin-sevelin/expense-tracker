'use client';

import React from 'react';
import { useAuthUser } from '../../hooks/useAuthUser';
import FilteredSummary from '../sharedComponents/FilteredSummary';
import MonthPicker from '../sharedComponents/MonthPicker';
import { Line } from 'react-chartjs-2';
import { useGetChartData } from '../../hooks/useGetChartData';

const GraphPage = () => {
  const { options, data } = useGetChartData();

  useAuthUser();
  return (
    <section className='max-w-7xl max-h-3xl m-auto '>
      <h2 className='text-5xl font-bold text-center'>CHART</h2>
      <MonthPicker />
      <FilteredSummary />
      <Line options={options} data={data} />
    </section>
  );
};

export default GraphPage;
