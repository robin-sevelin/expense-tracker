import React, { useTransition } from 'react';
import { useGetSum } from '../hooks/useGetSum';
import { useGetTransactions } from '../hooks/useGetTransactions';

const SumAmount = () => {
  const { sum } = useGetSum();
  useGetTransactions();
  return <div>Current balance: {sum} kr</div>;
};

export default SumAmount;
