'use client';

import React from 'react';
import { useGetCalenderDays } from '../../hooks/useGetCalenderDays';
import { useGetFilteredTransactions } from '../../hooks/useGetFIlteredTransaction';
import { ITransaction } from '../../models/ITransaction';

interface Props {
  transactions: ITransaction[];
}

const TransactionCalender = ({ transactions }: Props) => {
  const { filteredTransactions } = useGetFilteredTransactions(transactions);
  const { calenderArray } = useGetCalenderDays(
    filteredTransactions as ITransaction[]
  );

  return (
    <section className='flex w-3/5 m-auto flex-wrap'>
      {calenderArray.map((day, index) => (
        <div key={index}>
          <div>
            <h3>{day.day}</h3>
          </div>
        </div>
      ))}
    </section>
  );
};

export default TransactionCalender;
