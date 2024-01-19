'use client';

import React, { useState } from 'react';

import { useGetTransactions } from '../hooks/useGetTransactions';
import { ITransaction } from '../models/ITransaction';

const Periods = () => {
  const { transactions } = useGetTransactions();

  const getUniqueYears = (transactions: ITransaction[]) => {
    const uniqueYears = [] as number[];

    transactions.forEach((transaction) => {
      if (!uniqueYears.includes(transaction.year)) {
        uniqueYears.push(transaction.year);
      }
    });
    return uniqueYears;
  };

  const getUniqueMonths = (transactions: ITransaction[]) => {
    const uniqueMonths = [] as string[];

    transactions.forEach((transaction) => {
      if (!uniqueMonths.includes(transaction.month)) {
        uniqueMonths.push(transaction.month);
      }
    });
    return uniqueMonths;
  };

  const uniqueMonths = getUniqueMonths(transactions);
  const uniqueYears = getUniqueYears(transactions);

  return (
    <div className='join flex flex-col justify-center items-center'>
      {uniqueYears}
      {uniqueMonths}
    </div>
  );
};

export default Periods;
