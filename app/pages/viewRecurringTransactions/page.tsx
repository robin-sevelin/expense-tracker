import RecurringTransactions from '@/components/profilePage/RecurringTransactions';
import React from 'react';

const page = () => {
  return (
    <section className='w-full'>
      <h2 className='text-5xl font-bold flex justify-center'>
        RECURRING TRANSACTIONS
      </h2>
      <RecurringTransactions />
    </section>
  );
};

export default page;
