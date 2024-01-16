'use client';

import React from 'react';
import { Line } from 'react-chartjs-2';
import { useAuthUser } from '../hooks/useAuthUser';
import { useGetChartData } from '../hooks/useGetChartData';
import { useGetSum } from '../hooks/useGetSum';

const GraphPage = () => {
  const { options, data } = useGetChartData();
  useGetSum();
  useAuthUser();
  return (
    <>
      <Line options={options} data={data} />
    </>
  );
};

export default GraphPage;
