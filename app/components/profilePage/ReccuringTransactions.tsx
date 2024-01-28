'use client';

import { IReccuringExpense, IReccuringIncome } from '@/app/models/BudgetValues';
import React from 'react';

interface Props {
  transactions: IReccuringExpense[] | IReccuringIncome[];
}

const ReccuringIncomes = ({ transactions }: Props) => {
  return (
    <div>
      <h2>ReccuringIncomes</h2>
      {transactions.map((income, index) => (
        <div key={index}>
          <h3>{income.title}</h3>
          <p>{income.amount} kr</p>
        </div>
      ))}
    </div>
  );
};

export default ReccuringIncomes;
