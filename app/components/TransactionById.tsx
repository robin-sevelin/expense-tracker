'use client';

import React from 'react';
import { ITransaction } from '../models/ITransaction';

interface Props {
  transaction: ITransaction;
}

const TransactionById = ({ transaction }: Props) => {
  console.log(transaction);

  return (
    <div>
      <h2>Update transaction</h2>
      <p>Title: {transaction.title}</p>
      <p>Type: {transaction.type}</p>
      <p>Category: {transaction.category}</p>
      <p>Amount: {transaction.amount} kr</p>
    </div>
  );
};

export default TransactionById;
