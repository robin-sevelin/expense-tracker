'use client';

import React from 'react';
import { ITransaction } from '../models/ITransaction';

interface Props {
  transaction: ITransaction;
}

const TransactionById = ({ transaction }: Props) => {
  return (
    <div>
      <h2>{transaction.title}</h2>
      <p>{transaction.amount} kr</p>
    </div>
  );
};

export default TransactionById;
