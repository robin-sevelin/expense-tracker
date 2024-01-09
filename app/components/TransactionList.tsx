'use client';

import React from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../store/atoms';
import { useAuthUser } from '../hooks/useAuthUser';
import { useGetTransactions } from '../hooks/useGetTransactions';
import { useGetSum } from '../hooks/useGetSum';
import NotFound from './NotFound';
import Loading from './Loading';
import Link from 'next/link';

const TransactionList = () => {
  const [user] = useAtom(userAtom);
  const { isLoading, transactions } = useGetTransactions();
  const { sum } = useGetSum(transactions);
  useAuthUser(user);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h2> TransactionList</h2>
      {!transactions.length ? (
        <NotFound />
      ) : (
        transactions.map((transaction) => (
          <div key={transaction.id}>
            <h3>Title: {transaction.title}</h3>
            <p>Amount: {transaction.amount} kr</p>
            <p>Type: {transaction.type}</p>
            sum: {sum} kr
            <button className='btn btn-secodary'>Remove</button>
            <Link href={`/pages/${transaction.id}`}>
              <button className='btn btn-primary'>Edit</button>
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default TransactionList;
