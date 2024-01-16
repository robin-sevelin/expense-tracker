'use client';

import React from 'react';
import { Line } from 'react-chartjs-2';
import { useAuthUser } from '../hooks/useAuthUser';
import { useGetChartData } from '../hooks/useGetChartData';

const GraphPage = () => {
  const { options, data } = useGetChartData();
  useAuthUser();
  return (
    <>
      <Line options={options} data={data} />
    </>
  );
};

export default GraphPage;
