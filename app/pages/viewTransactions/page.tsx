'use client';

import FilteredSummary from '@/app/components/sharedComponents/FilteredSummary';
import Loading from '@/app/components/sharedComponents/Loading';
import MonthPicker from '@/app/components/sharedComponents/MonthPicker';
import TransactionCalender from '@/app/components/transactionPage/TransactionCalender';
import TransactionList from '@/app/components/transactionPage/TransactionList';
import ViewMode from '@/app/components/transactionPage/ViewMode';
import { useAuthUser } from '@/app/hooks/useAuthUser';
import { useGetTransactions } from '@/app/hooks/useGetTransactions';
import { useState } from 'react';

const ViewTransactions = () => {
  const [view, setView] = useState('list');
  const { transactions, isLoading } = useGetTransactions();
  useAuthUser();

  const setShowList = (value: string) => {
    setView(value);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section>
      <h2 className='text-5xl font-bold flex justify-center'>TRANSACTIONS</h2>
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
