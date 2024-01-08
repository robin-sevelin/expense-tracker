'use client';

import React from 'react';
import { useGetBalance } from '../hooks/useGetBalance';
import Loading from './Loading';

const BalanceAmount = () => {
  const { isLoading, balance } = useGetBalance();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h3>Balance amount: {balance} kr</h3>
    </div>
  );
};

export default BalanceAmount;
