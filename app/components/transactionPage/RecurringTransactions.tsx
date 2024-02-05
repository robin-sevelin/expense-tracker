'use client';

import { useAuthUser } from '@/hooks/useAuthUser';
import { submitAtom } from '@/store/atoms';
import { useAtom } from 'jotai';
import React, { useState } from 'react';
import ModalDialog from '@/components/sharedComponents/ModalDialog';
import { deleteReccuringTransaction } from '@/../firebase/operations/deleteRecurringTransaction';
import { useGetRecurringTransactions } from '@/hooks/useGetRecurringTransactions';
import { TRANSACTION_TYPES } from '@/constants/constants';
import FilteredSummary from '../sharedComponents/FilteredSummary';

const RecurringTransactions = () => {
  const { recurringTransactions } = useGetRecurringTransactions();
  const { user } = useAuthUser();
  const [, setIsSubmitted] = useAtom(submitAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async (id: string) => {
    await deleteReccuringTransaction(user, id);
    setIsSubmitted(true);
    setIsModalOpen(true);
  };
  return (
    <>
      <FilteredSummary />
      <div className=' flex max-w-3/4 flex-wrap gap-5 justify-center mt-10'>
        {recurringTransactions?.map((transaction) => (
          <div
            key={transaction.id}
            className='card  bg-neutral text-neutral-content mb-3'
          >
            <div className='card-body  items-center text-center'>
              <h3>{transaction.title}</h3>
              <p>
                Amount:{' '}
                {transaction.type === TRANSACTION_TYPES.EXPENSE && (
                  <span>-</span>
                )}
                {transaction.amount} kr
              </p>
              <p>Day of month: {transaction.date}</p>
              <div className='card-actions justify-end'>
                <button
                  className='btn btn-error w-20'
                  onClick={() => handleDelete(transaction.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
        {isModalOpen && (
          <ModalDialog
            onHandleChange={() => setIsModalOpen(false)}
            isModalOpen={isModalOpen}
          />
        )}
      </div>
    </>
  );
};

export default RecurringTransactions;
