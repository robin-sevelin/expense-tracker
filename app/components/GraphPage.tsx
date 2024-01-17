'use client';

import React from 'react';
import { Line } from 'react-chartjs-2';
import { useAuthUser } from '../hooks/useAuthUser';
import { useGetChartData } from '../hooks/useGetChartData';
import { useGetSum } from '../hooks/useGetSum';

const GraphPage = () => {
  const { sum } = useGetSum();
  const { options, data } = useGetChartData();

  useAuthUser();
  return (
    <section className='max-w-7xl max-h-3xl m-auto'>
      <h2 className='text-5xl font-bold'>GRAPH.</h2>
      <p>Remaning balance {sum} kr</p>
      <Line options={options} data={data} />
    </section>
  );
};

export default GraphPage;
