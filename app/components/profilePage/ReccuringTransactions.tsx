'use client';

import React, { useState } from 'react';
import ReccuringExpenses from './ReccuringExpenses';
import { reccuringExpenseAtom, reccuringIncomeAtom } from '@/app/store/atoms';
import { useAtom } from 'jotai';
import ReccuringIncomes from './ReccuringIncomes';

const ReccurringTransactions = () => {
  const [reccruingExpenses] = useAtom(reccuringExpenseAtom);
  const [reccuringIncomes] = useAtom(reccuringIncomeAtom);
  const [view, setView] = useState('expense');

  return (
    <section className=' flex flex-col m-5 p-5 justify-center items-center'>
      <fieldset>
        <legend>Select View</legend>
        <div className='join'>
          <input
            defaultChecked
            className='join-item btn w-36'
            type='radio'
            name='view'
            aria-label='Expenses'
            id='expense'
            value='expense'
            onClick={() => setView('expense')}
          />
          <input
            className='join-item btn w-36 '
            type='radio'
            name='view'
            aria-label='Incomes'
            id='income'
            value={'income'}
            onClick={() => setView('income')}
          />
        </div>
      </fieldset>

      {view === 'expense' ? (
        <ReccuringExpenses expenses={reccruingExpenses} />
      ) : (
        <ReccuringIncomes incomes={reccuringIncomes} />
      )}
    </section>
  );
};

export default ReccurringTransactions;
