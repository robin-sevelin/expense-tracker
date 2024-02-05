'use client';

import React, { useState } from 'react';
import { TRANSACTION_TYPES } from '@/constants/constants';

const RecurringTransactions = () => {
  const [view, setView] = useState(TRANSACTION_TYPES.EXPENSE);

  return (
    <div>
      <fieldset>
        <legend>Select View</legend>
        <div className='join'>
          <input
            defaultChecked
            className='join-item btn w-36'
            type='radio'
            name='view'
            aria-label='Expenses'
            id={TRANSACTION_TYPES.EXPENSE}
            value={TRANSACTION_TYPES.EXPENSE}
            onClick={() => setView(TRANSACTION_TYPES.EXPENSE)}
          />
          <input
            className='join-item btn w-36 '
            type='radio'
            name='view'
            aria-label='Incomes'
            id={TRANSACTION_TYPES.INCOME}
            value={TRANSACTION_TYPES.INCOME}
            onClick={() => setView(TRANSACTION_TYPES.INCOME)}
          />
        </div>
      </fieldset>
    </div>
  );
};

export default RecurringTransactions;
