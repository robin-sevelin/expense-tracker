'use client';

import React from 'react';
import { useGetCalenderDays } from '../hooks/useGetCalenderDays';

const TransactionCalender = () => {
  const { calenderArray } = useGetCalenderDays();

  return (
    <div className='flex'>
      {calenderArray.map((day, index) => (
        <div className='w-24 h-24 m-2 border-2 ' key={index}>
          <div>{day}</div>
        </div>
      ))}
    </div>
  );
};

export default TransactionCalender;
