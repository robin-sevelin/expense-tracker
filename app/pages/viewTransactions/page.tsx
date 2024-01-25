'use client';

import FilteredSummary from '@/app/components/sharedComponents/FilteredSummary';
import MonthPicker from '@/app/components/sharedComponents/MonthPicker';
import TransactionCalender from '@/app/components/transactionPage/TransactionCalender';
import TransactionList from '@/app/components/transactionPage/TransactionList';
import ViewMode from '@/app/components/transactionPage/ViewMode';
import { useAuthUser } from '@/app/hooks/useAuthUser';
import { useGetTransactions } from '@/app/hooks/useGetTransactions';
import { useState } from 'react';

const ViewTransactions = () => {
  const [view, setView] = useState('list');
  const { transactions } = useGetTransactions();
  const { user } = useAuthUser();

  const setShowList = (value: string) => {
    setView(value);
  };

  return (
    <section className='transaction-page'>
      <h2 className='text-5xl font-bold'>TRANSACTIONS</h2>
      <MonthPicker />
      <FilteredSummary />
      <ViewMode onSetShowList={setShowList} />
      {view === 'list' ? (
        <TransactionList transactions={transactions} />
      ) : (
        <TransactionCalender transactions={transactions} />
      )}
    </section>
  );
};

export default ViewTransactions;
