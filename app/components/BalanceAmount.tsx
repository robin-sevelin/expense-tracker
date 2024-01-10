'use client';

import { useAtom } from 'jotai';
import React from 'react';
import { balanceAtom } from '../store/atoms';

const BalanceAmount = () => {
  const [balance] = useAtom(balanceAtom);
  return <div>Balance: {balance} kr</div>;
};

export default BalanceAmount;
