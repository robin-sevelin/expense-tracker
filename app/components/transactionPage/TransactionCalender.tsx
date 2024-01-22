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
    <div className='flex max-w-2/4 m-auto flex-wrap'>
      {calenderArray.map((day, index) => (
        <div
          className='w-24 h-24 m-2 border-2 flex flex-col justify-center items-center'
          key={index}
        >
          <div>
            <h3>{day.day}</h3>
            {day.expenseSum !== 0 && (
              <p className=' text-red-500'>
                {day.expenseSum !== 0 && day.expenseSum} kr
              </p>
            )}

            {day.incomeSum !== 0 && (
              <p className=' text-green-500'>{day.incomeSum} kr</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionCalender;
