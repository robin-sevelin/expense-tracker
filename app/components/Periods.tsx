'use client';

import React, { useEffect, useState } from 'react';
import { useGetPeriods } from '../hooks/useGetPeriod';
import { useAtom } from 'jotai';
import { selectedMonthAtom } from '../store/atoms';

const Periods = () => {
  const [selectedMonth, setSelectedMonth] = useAtom(selectedMonthAtom);
  const [selectedYear, setSelectedYear] = useState(selectedMonth.year);
  const { periods } = useGetPeriods();

  const filteredMonths = periods?.months.filter(
    (month) => month.year === selectedYear
  );

  const sortedYears = periods?.years.sort();
  const sortedMonths = filteredMonths?.sort();

  return (
    <div className='join flex flex-col justify-center items-center'>
      <fieldset>
        <legend>SELECT YEAR</legend>
        {sortedYears?.map((year, index) => (
          <input
            key={index}
            className='btn m-1'
            type='radio'
            aria-label={year}
            name='year'
            onChange={() => setSelectedYear(year)}
          />
        ))}
      </fieldset>
      {selectedYear && (
        <div className='join'>
          <fieldset>
            <legend>SELECT MONTH</legend>
            {sortedMonths?.map((month, index) => (
              <input
                key={index}
                type='radio'
                className='btn m-1'
                aria-label={month.month}
                name='month'
                onChange={() => setSelectedMonth(month)}
                checked={selectedMonth.month === month.month}
              />
            ))}
          </fieldset>
        </div>
      )}
    </div>
  );
};

export default Periods;
