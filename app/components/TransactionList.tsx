'use client';

import React from 'react';
import { useAuthUser } from '../hooks/useAuthUser';
import NotFound from './NotFound';
import Loading from './Loading';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { useGetTransactions } from '../hooks/useGetTransactions';
import { deleteTransactionObject } from '@/firebase/operations/deleteTransaction';
import { monthAtom, submitAtom } from '../store/atoms';
import MonthPicker from './MonthPicker';

const TransactionList = () => {
  const [, setIsSubmitted] = useAtom(submitAtom);
  const { user } = useAuthUser();
  const { transactions, isLoading } = useGetTransactions();
  const [currentMonth] = useAtom(monthAtom);

  const handleDelete = async (id: string) => {
    await deleteTransactionObject(user, id);
    setIsSubmitted(true);
  };

  const filteredTransactions = transactions
    ? transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        return (
          transactionDate.getMonth() === currentMonth.getMonth() &&
          transactionDate.getFullYear() === currentMonth.getFullYear()
        );
      })
    : null;

  return (
    <>
      <MonthPicker />
      {isLoading ? (
        <Loading />
      ) : (
        <section className='max-w-7xl max-h-3xl m-auto'>
          <h2 className='text-5xl font-bold'>TRANSACTIONS.</h2>
          {!filteredTransactions ? (
            <NotFound />
          ) : (
            filteredTransactions.map((transaction) => (
              <div key={transaction.id}>
                <h3>Title: {transaction.title}</h3>
                <p>Amount: {transaction.amount} kr</p>
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
        </section>
      )}
    </>
  );
};

export default TransactionList;
