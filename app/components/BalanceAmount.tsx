'use client';

import React from 'react';
import { useGetCurrentSum } from '../hooks/useGetCurrentSum';
import { CURRENT_MONTH } from '../constants/constants';

const BalanceAmount = () => {
  const { sum } = useGetCurrentSum();
  return (
    <div>
      Balance {CURRENT_MONTH}: {sum} kr
    </div>
  );
};

export default BalanceAmount;
