'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { deleteTransactionObject } from '@/firebase/operations/deleteTransaction';
import { submitAtom, userAtom } from '../../store/atoms';
import { useGetFilteredTransactions } from '../../hooks/useGetFIlteredTransaction';
import { ITransaction } from '@/app/models/ITransaction';
import ModalDialog from '../sharedComponents/ModalDialog';

interface Props {
  transactions: ITransaction[];
}

const TransactionList = ({ transactions }: Props) => {
  const [, setIsSubmitted] = useAtom(submitAtom);
  const [user] = useAtom(userAtom);
  const { filtredTransactions } = useGetFilteredTransactions(transactions);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async (id: string) => {
    await deleteTransactionObject(user, id);
    setIsSubmitted(true);
    setIsModalOpen(true);
  };

  return (
    <section className='flex flex-wrap gap-5 justify-center '>
      {filtredTransactions?.map((transaction) => {
        const transactionDate = new Date(transaction.date);
        const day = transactionDate.getDate();
        const month = transactionDate.getMonth() + 1;

        return (
          <div
            className='card w-50 bg-neutral text-neutral-content mb-3'
            key={transaction.id}
          >
            <div className='card-body  items-center text-center'>
              <h3 className='card-title'>{transaction.title}</h3>
              <p>
                Amount: {transaction.type === 'expense' && <span>-</span>}
                {transaction.amount} kr
              </p>
              <p>Date: {`${day}/${month}`}</p>
              <div className='card-actions justify-end'>
                <button
                  className='btn btn-error w-20'
                  onClick={() => handleDelete(transaction.id)}
                >
                  Remove
                </button>
                <Link
                  href={`/pages/${transaction.id}`}
                  className='btn btn-primary w-20'
                >
                  <span>Edit</span>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
      {isModalOpen && (
        <ModalDialog
          onHandleChange={() => setIsModalOpen(false)}
          isModalOpen={isModalOpen}
        />
      )}
    </section>
  );
};

export default TransactionList;
