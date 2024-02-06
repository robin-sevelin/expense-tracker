'use client';

import React from 'react';
import { useGetCurrentSum } from '@/hooks/useGetCurrentSum';
import { CURRENT_DATE } from '@/constants/constants';
import { useGetTransactions } from '@/hooks/useGetTransactions';
import { useGetRecurringTransactions } from '@/hooks/useGetRecurringTransactions';

const BalanceAmount = () => {
  const { sum } = useGetCurrentSum();
  useGetRecurringTransactions();
  useGetTransactions();

  return (
    <>
      {sum && (
        <div className=' p-2 m-1'>
          {CURRENT_DATE.toLocaleString('en-US', {
            month: 'long',
          })}
          : {sum} SEK
        </div>
      )}
    </>
  );
};

export default BalanceAmount;
