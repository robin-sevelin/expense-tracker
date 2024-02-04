'use client';

import React from 'react';
import Loading from '@/components/sharedComponents/Loading';
import { useGetTransactionById } from '@/hooks/useGetTransactionById';
import { TRANSACTION_TYPES } from '@/constants/constants';

interface Props {
  id: string;
}

const TransactionById = ({ id }: Props) => {
  const { isLoading, transaction } = useGetTransactionById(id);
  if (!isLoading) {
    return <Loading />;
  }
  return (
    <section className='card w-96 bg-neutral text-neutral-content mb-5 mt-5'>
      <div className='card-body items-center text-center'>
        <h2 className='card-title'>{transaction.title}</h2>
        <p>
          Amount:{' '}
          {transaction.type === TRANSACTION_TYPES.EXPENSE && <span>-</span>}
          {transaction.amount} kr
        </p>
        <p>Type: {transaction.type}</p>
        <p>Category: {transaction.category}</p>
        <div className='card-actions justify-end'></div>
      </div>
    </section>
  );
};

export default TransactionById;
