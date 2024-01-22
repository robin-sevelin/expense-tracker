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
    <section className=' m-auto min-w-10 '>
      {filteredTransactions?.map((transaction) => (
        <div
          className='card w-96 bg-neutral text-neutral-content mb-3'
          key={transaction.id}
        >
          <div className='card-body items-center text-center'>
            <h2 className='card-title'>{transaction.title}</h2>
            <p>
              Amount: {transaction.type === 'expense' && <span>-</span>}
              {transaction.amount} kr
            </p>
            <div className='card-actions justify-end'>
              <button
                className='btn btn-error'
                onClick={() => handleDelete(transaction.id)}
              >
                Remove
              </button>
              <Link
                href={`/pages/${transaction.id}`}
                className='btn btn-primary'
              >
                <span>Edit</span>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default TransactionList;
