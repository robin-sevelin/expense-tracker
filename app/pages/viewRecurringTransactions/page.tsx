import RecurringTransactions from '@/components/transactionPage/RecurringTransactions';
import React from 'react';

const page = () => {
  return (
    <>
      <h2 className='text-5xl font-bold flex justify-center'>
        RECURRING TRANSACTIONS
      </h2>
      <RecurringTransactions />
    </>
  );
};

export default page;
