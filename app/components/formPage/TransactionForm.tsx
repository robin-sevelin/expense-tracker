'use client';

import React, { useState } from 'react';
import AddTransaction from './AddTransaction';
import AddRecurringTransaction from './AddRecurrningTransaction.tsx';

const TransactionForm = () => {
  const [form, setForm] = useState('one time');
  return (
    <>
      <div className='join'>
        <fieldset>
          <legend>Select transaction type</legend>
          <input
            className='join-item btn'
            type='radio'
            aria-label='One time'
            onClick={() => setForm('one time')}
            defaultChecked
            name='form'
            value={'one time'}
          />
          <input
            className='join-item btn'
            type='radio'
            name='form'
            aria-label='Recurring'
            onClick={() => setForm('recurring')}
            value={'recurring'}
          />
        </fieldset>
      </div>

      {form === 'one time' ? <AddTransaction /> : <AddRecurringTransaction />}
    </>
  );
};

export default TransactionForm;
