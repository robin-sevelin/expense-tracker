import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { monthAtom } from '../store/atoms';

const MonthPicker = () => {
  const [currentMonth, setCurrentMonth] = useAtom(monthAtom);

  const goBack = () => {
    const previousMonth = new Date(currentMonth);
    previousMonth.setMonth(currentMonth.getMonth() - 1);
    setCurrentMonth(previousMonth);
  };

  const goForward = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(currentMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };

  return (
    <div>
      <button onClick={goBack} className='btn btn-primary'>
        Previous Month
      </button>
      <span>
        {currentMonth.toLocaleString('default', {
          month: 'long',
          year: 'numeric',
        })}
      </span>
      <button onClick={goForward} className='btn btn-primary'>
        Next Month
      </button>
    </div>
  );
};

export default MonthPicker;
