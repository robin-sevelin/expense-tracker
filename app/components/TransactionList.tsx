'use client';

import React from 'react';
import { useAuthUser } from '../hooks/useAuthUser';
import NotFound from './NotFound';
import Loading from './Loading';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { submitAtom } from '../store/atoms';
import { useGetTransactions } from '../hooks/useGetTransactions';
import { useGetSum } from '../hooks/useGetSum';
import Periods from './Periods';
import { deleteTransactionObject } from '@/firebase/operations/deleteTransaction';

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
      <Periods />
      {isLoading ? (
        <Loading />
      ) : (
        <section className='max-w-7xl max-h-3xl m-auto'>
          <h2 className='text-5xl font-bold'>TRANSACTIONS.</h2>
          {!transactions.length ? (
            <NotFound />
          ) : (
            transactions.map((transaction) => (
              <div key={transaction.id}>
                <h3>Title: {transaction.title}</h3>
                <p>Amount: {transaction.amount} kr</p>
                <p>Type: {transaction.type}</p>
                <p>Category: {transaction.category}</p>
                <button
                  className='btn btn-error'
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
        </section>
      )}
    </>
  );
};

export default TransactionList;
