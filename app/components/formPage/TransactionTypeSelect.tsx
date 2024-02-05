'use client';

import React, { useState } from 'react';
import AddTransaction from './AddTransaction';
import AddRecurringTransaction from './AddRecurrningTransaction';
import { useAuthUser } from '@/hooks/useAuthUser';

const TransactionTypeSelect = () => {
  const [form, setForm] = useState('one time');
  useAuthUser();
  return (
    <div className='flex flex-col justify-center items-center'>
      <fieldset>
        <legend>Select Recurrancy</legend>
        <div className='join'>
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
        </div>
      </fieldset>
      {form === 'one time' ? <AddTransaction /> : <AddRecurringTransaction />}
    </div>
  );
};

export default TransactionTypeSelect;
