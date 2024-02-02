'use client';

import { CURRENT_DATE } from '@/constants/constants';
import { useGetBalance } from '@/hooks/useGetBalance';
import { useGetCurrentSum } from '@/hooks/useGetCurrentSum';
import { useGetRecurringExpenses } from '@/hooks/useGetRecurringExpenses';
import { useGetRecurringIncomes } from '@/hooks/useGetRecurringIncomes';
import { useGetTransactions } from '@/hooks/useGetTransactions';
import Loading from './sharedComponents/Loading';

const ProgressBar = () => {
  const { sum } = useGetCurrentSum();
  const { balance, isLoading } = useGetBalance();

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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className='flex flex-col justify-center items-center'>
      <div className=' p-2 m-1'>
        {CURRENT_DATE.toLocaleString('en-US', {
          month: 'long',
        })}
        : {sum} SEK
      </div>
      <div
        className='radial-progress text-primary'
        role='progressbar'
        style={progressBarStyle as React.CSSProperties}
      >
        {percent} %
      </div>
    </section>
  );
};

export default ProgressBar;
