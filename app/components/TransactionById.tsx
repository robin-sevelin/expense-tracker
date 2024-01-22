'use client';

import React from 'react';
import { ITransaction } from '../models/ITransaction';

interface Props {
  transaction: ITransaction;
}

const TransactionById = ({ transaction }: Props) => {
  return (
    <div className='card w-96 bg-neutral text-neutral-content mb-5 mt-5'>
      <div className='card-body items-center text-center'>
        <h2 className='card-title'>{transaction.title}</h2>
        <p>
          Amount: {transaction.type === 'expense' && <span>-</span>}
          {transaction.amount} kr
        </p>
        <p>Type: {transaction.type}</p>
        <p>Category: {transaction.category}</p>
        <p>Reccurancy: {transaction.reccurancy}</p>
        <div className='card-actions justify-end'></div>
      </div>
    </div>
  );
};

export default TransactionById;
