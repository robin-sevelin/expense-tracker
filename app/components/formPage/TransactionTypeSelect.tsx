'use client';

import React, { useState } from 'react';
import AddTransaction from './AddTransaction';
import AddRecurringTransaction from './AddRecurrningTransaction';

const TransactionTypeSelect = () => {
  const [form, setForm] = useState('one time');
  return (
    <div className=' flex flex-col m-5 p-5 justify-center items-center'>
      <fieldset>
        <legend>Select transaction type</legend>
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
