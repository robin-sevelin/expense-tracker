'use client';

import React from 'react';

import { useAuthUser } from '../hooks/useAuthUser';
import NotFound from './NotFound';
import Loading from './Loading';
import Link from 'next/link';
import { deleteTransactionObject } from '@/firebase/firestore';
import { useAtom } from 'jotai';
import { submitAtom } from '../store/atoms';
import { useGetTransactions } from '../hooks/useGetTransactions';
import { useGetSum } from '../hooks/useGetSum';

const TransactionList = () => {
  const [, setIsSubmitted] = useAtom(submitAtom);
  const { user } = useAuthUser();
  const { transactions, isLoading } = useGetTransactions();
  const { sum } = useGetSum();

  const handleDelete = async (id: string) => {
    await deleteTransactionObject(user, id);
    setIsSubmitted(true);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <h2>Transactions</h2>
          {!transactions.length ? (
            <NotFound />
          ) : (
            transactions.map((transaction) => (
              <div key={transaction.id}>
                <h3>Title: {transaction.title}</h3>
                <p>Amount: {transaction.amount} kr</p>
                <p>Type: {transaction.type}</p>

                <button
                  className='btn btn-secodary'
                  onClick={() => handleDelete(transaction.id)}
                >
                  Remove
                </button>
                <Link href={`/pages/${transaction.id}`}>
                  <button className='btn btn-primary'>Edit</button>
                </Link>
              </div>
            ))
          )}
          Remaning balance: {sum} kr
        </div>
      )}
    </>
  );
};

export default TransactionList;
