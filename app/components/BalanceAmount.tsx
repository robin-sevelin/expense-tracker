'use client';

import React from 'react';
import { useGetBalance } from '../hooks/useGetBalance';

const BalanceAmount = () => {
  const { balance } = useGetBalance();
  return <div>Balance: {balance} kr</div>;
};

export default BalanceAmount;
