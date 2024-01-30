'use client';

import React from 'react';
import { useGetCurrentSum } from '../../hooks/useGetCurrentSum';
import { CURRENT_DATE } from '../../constants/constants';
import { useGetRecurringExpenses } from '@/app/hooks/useGetRecurringExpenses';
import { useGetRecurringIncomes } from '@/app/hooks/useGetRecurringIncomes';

const BalanceAmount = () => {
  const { sum } = useGetCurrentSum();
  useGetRecurringExpenses();
  useGetRecurringIncomes();

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
