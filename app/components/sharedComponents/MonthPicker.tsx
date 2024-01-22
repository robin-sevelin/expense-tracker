import { useAtom } from 'jotai';
import React from 'react';
import { monthAtom } from '../../store/atoms';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';

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
    <div className='flex flex-col justify-center items-center mt-5 mb-5'>
      <h3 className='text-5xl font-bold mb-5'>
        {currentMonth.toLocaleString('en-US', {
          month: 'long',
          year: 'numeric',
        })}
      </h3>
      <div className='join'>
        <button onClick={goBack} className='btn btn-primary join-item'>
          <FaArrowCircleLeft />
        </button>

        <button onClick={goForward} className='btn btn-primary join-item'>
          <FaArrowCircleRight />
        </button>
      </div>
    </div>
  );
};

export default MonthPicker;
