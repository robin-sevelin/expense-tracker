'use client';

import FilteredSummary from '@/app/components/FilteredSummary';
import MonthPicker from '@/app/components/MonthPicker';
import TransactionCalender from '@/app/components/TransactionCalender';
import TransactionList from '@/app/components/TransactionList';
import ViewMode from '@/app/components/ViewMode';
import { useState } from 'react';

const ViewTransactions = () => {
  const [view, setView] = useState('list');

  const setShowList = (value: string) => {
    setView(value);
  };
  return (
    <>
      <h2 className='text-5xl font-bold'>TRANSACTIONS.</h2>
      <MonthPicker />
      <FilteredSummary />
      <ViewMode onSetShowList={setShowList} />
      {view === 'list' ? <TransactionList /> : <TransactionCalender />}
    </>
  );
};

export default ViewTransactions;
