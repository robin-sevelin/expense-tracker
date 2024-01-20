'use client';

import React from 'react';
import { useGetCurrentSum } from '../hooks/useGetCurrentSum';

const BalanceAmount = () => {
  const { sum } = useGetCurrentSum();
  return <div>Balance: {sum} kr</div>;
};

export default BalanceAmount;
