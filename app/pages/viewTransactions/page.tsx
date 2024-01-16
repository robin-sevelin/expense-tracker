'use client';

import Loading from '@/app/components/Loading';
import TransactionList from '@/app/components/TransactionList';
import { useGetSum } from '@/app/hooks/useGetSum';
import { useGetTransactions } from '@/app/hooks/useGetTransactions';

const ViewTransactions = () => {
  const { transactions, isLoading } = useGetTransactions();
  const { sum } = useGetSum();

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <TransactionList
        transactions={transactions}
        isLoading={isLoading}
        sum={sum}
      />
    </div>
  );
};

export default ViewTransactions;
