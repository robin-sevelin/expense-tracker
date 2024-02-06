'use client';

import React from 'react';
import Loading from '@/components/sharedComponents/Loading';
import { useGetTransactionById } from '@/hooks/useGetTransactionById';
import { TRANSACTION_TYPES } from '@/constants/constants';

interface Props {
  id: string;
}

const TransactionById = ({ id }: Props) => {
  const { isLoading, transactionById } = useGetTransactionById(id);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <section className='card bg-neutral text-neutral-content mb-5 mt-5'>
      <div className='card-body items-center text-center'>
        <h2 className='card-title'>{transactionById.title}</h2>
        <p>
          Amount:{' '}
          {transactionById.type === TRANSACTION_TYPES.EXPENSE && <span>-</span>}
          {transactionById.amount} SEK
        </p>
        <p>Type: {transactionById.type}</p>
        <p>Category: {transactionById.category}</p>
        <div className='card-actions justify-end'></div>
      </div>
    </section>
  );
};

export default TransactionById;
