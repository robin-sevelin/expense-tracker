'use client';

import { CURRENT_DATE } from '@/constants/constants';
import { useGetBalance } from '@/hooks/useGetBalance';
import { useGetCurrentSum } from '@/hooks/useGetCurrentSum';
import { useGetRecurringExpenses } from '@/hooks/useGetRecurringExpenses';
import { useGetRecurringIncomes } from '@/hooks/useGetRecurringIncomes';
import { useGetTransactions } from '@/hooks/useGetTransactions';

const ProgressBar = () => {
  const { sum } = useGetCurrentSum();
  const { balance } = useGetBalance();

  let percent = Math.round((sum / balance) * 100);

  if (percent > 100) {
    percent = 100;
  }
  useGetRecurringExpenses();
  useGetRecurringIncomes();
  useGetTransactions();

  const progressBarStyle = {
    '--value': percent,
  };

  return (
    <div className='flex flex-col justify-center items-center mt-5'>
      <div className=' p-2 m-1'>
        <h3 className='font-bold'>
          {CURRENT_DATE.toLocaleString('en-US', {
            month: 'long',
          })}
          : {sum} SEK
        </h3>
      </div>
      <div
        className='radial-progress text-primary'
        role='progressbar'
        style={progressBarStyle as React.CSSProperties}
      >
        {percent} %
      </div>
      <p>remains</p>
    </div>
  );
};

export default ProgressBar;
