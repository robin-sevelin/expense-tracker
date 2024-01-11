'use client';

import React from 'react';
import { Line } from 'react-chartjs-2';
import { useAtom } from 'jotai';
import { useAuthUser } from '../hooks/useAuthUser';
import { userAtom } from '../store/atoms';
import { useGetChartData } from '../hooks/useGetChartData';

const GraphPage = () => {
  const { options, data } = useGetChartData();
  const [user] = useAtom(userAtom);
  useAuthUser(user);
  return <Line options={options} data={data} />;
};

export default GraphPage;
