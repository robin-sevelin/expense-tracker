'use client';

import React from 'react';
import { useAuthUser } from '../hooks/useAuthUser';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { deleteTransactionObject } from '@/firebase/operations/deleteTransaction';
import { submitAtom } from '../store/atoms';
import { useGetFilteredTransactions } from '../hooks/useGetFIlteredTransaction';

const TransactionList = () => {
  const [, setIsSubmitted] = useAtom(submitAtom);
  const { user } = useAuthUser();
  const { filteredTransactions } = useGetFilteredTransactions();

  const handleDelete = async (id: string) => {
    await deleteTransactionObject(user, id);
    setIsSubmitted(true);
  };

  return (
    <>
      <section className='max-w-7xl max-h-3xl m-auto'>
        {filteredTransactions?.map((transaction) => (
          <div key={transaction.id}>
            <h3>Title: {transaction.title}</h3>
            <p>
              Amount: {transaction.type === 'expense' && <span>-</span>}
              {transaction.amount} kr
            </p>
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
        ))}
      </section>
    </>
  );
};

export default TransactionList;
