'use client';

import React from 'react';
import { useGetCurrentSum } from '../../hooks/useGetCurrentSum';
import { CURRENT_DATE } from '../../constants/constants';
import Loading from './Loading';

const BalanceAmount = () => {
  const { sum, isLoading } = useGetCurrentSum();

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className=' p-2 m-1'>
      {CURRENT_DATE.toLocaleString('en-US', {
        month: 'long',
      })}
      : {sum} kr
    </div>
  );
};

export default BalanceAmount;
