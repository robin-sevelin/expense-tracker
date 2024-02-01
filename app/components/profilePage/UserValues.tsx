'use client';

import React, { useState } from 'react';
import AddBalance from '../formPage/AddBalance';
import AddReccurentExpenses from '../formPage/AddReccurentExpenses';
import AddReccurentIncomes from '../formPage/AddReccurentIncomes';
import { TRANSACTION_TYPES } from '@/constants/constants';

const UserValues = () => {
  const [section, setSection] = useState(TRANSACTION_TYPES.BUDGET);
  return (
    <section className=' flex flex-col justify-center items-center bg-base-200 h-10xl gap-5 p-10 '>
      <fieldset>
        <legend className='font-bold mb-3'>Select section</legend>
        <div className='join'>
          <input
            className='join-item btn'
            type='radio'
            name='options'
            aria-label='Budget'
            defaultChecked
            id={TRANSACTION_TYPES.BUDGET}
            value={TRANSACTION_TYPES.BUDGET}
            onClick={() => setSection(TRANSACTION_TYPES.BUDGET)}
          />
          <input
            className='join-item btn'
            type='radio'
            name='options'
            aria-label='Expenses'
            id={TRANSACTION_TYPES.EXPENSE}
            value={TRANSACTION_TYPES.EXPENSE}
            onClick={() => setSection(TRANSACTION_TYPES.EXPENSE)}
          />
          <input
            className='join-item btn'
            type='radio'
            name='options'
            aria-label='Incomes'
            id={TRANSACTION_TYPES.INCOME}
            value={TRANSACTION_TYPES.INCOME}
            onClick={() => setSection(TRANSACTION_TYPES.INCOME)}
          />
        </div>
      </fieldset>
      {section == TRANSACTION_TYPES.BUDGET && <AddBalance />}
      {section == TRANSACTION_TYPES.EXPENSE && <AddReccurentExpenses />}
      {section == TRANSACTION_TYPES.INCOME && <AddReccurentIncomes />}
    </section>
  );
};

export default UserValues;
