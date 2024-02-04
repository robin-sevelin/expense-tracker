'use client';

import FilteredSummary from '@/components/sharedComponents/FilteredSummary';
import Loading from '@/components/sharedComponents/Loading';
import MonthPicker from '@/components/sharedComponents/MonthPicker';
import TransactionCalender from '@/components/transactionPage/TransactionCalender';
import TransactionList from '@/components/transactionPage/TransactionList';
import ViewMode from '@/components/transactionPage/ViewMode';
import { useAuthUser } from '@/hooks/useAuthUser';
import { useGetTransactions } from '@/hooks/useGetTransactions';
import { useState } from 'react';

const Transactions = () => {
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
    <>
      <MonthPicker />
      <FilteredSummary />
      <ViewMode onSetShowList={setShowList} />
      {view === 'list' ? (
        <TransactionList transactions={transactions} />
      ) : (
        <TransactionCalender transactions={transactions} />
      )}
    </>
  );
};

export default Transactions;
