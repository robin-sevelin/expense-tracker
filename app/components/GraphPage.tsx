'use client';

import React from 'react';
import { Line } from 'react-chartjs-2';
import { useAtom } from 'jotai';
import { useAuthUser } from '../hooks/useAuthUser';
import { transactionsAtom, userAtom } from '../store/atoms';
import { useGetChartData } from '../hooks/useGetChartData';
import { useGetTransactions } from '../hooks/useGetTransactions';
import { useGetSum } from '../hooks/useGetSum';

const GraphPage = () => {
  const [transactions] = useAtom(transactionsAtom);
  const { options, data } = useGetChartData();
  const [user] = useAtom(userAtom);

  useAuthUser(user);
  useGetSum(transactions);
  useGetTransactions();

  return (
    <>
      <Line options={options} data={data} />
    </>
  );
};

export default GraphPage;
