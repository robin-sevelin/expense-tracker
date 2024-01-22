'use client';

import React from 'react';
import { useGetCurrentSum } from '../hooks/useGetCurrentSum';
import { CURRENT_DATE } from '../constants/constants';

const BalanceAmount = () => {
  const { sum } = useGetCurrentSum();
  return (
    <div>
      Balance
      {CURRENT_DATE.toLocaleString('en-US', {
        month: 'long',
      })}
      : {sum} kr
    </div>
  );
};

export default BalanceAmount;
