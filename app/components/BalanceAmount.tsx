'use client';

import React from 'react';

interface Props {
  balance: number;
}

const BalanceAmount = ({ balance }: Props) => {
  return <div>Balance: {balance} kr</div>;
};

export default BalanceAmount;
