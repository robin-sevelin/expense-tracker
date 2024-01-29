'use client';

import React, { useState } from 'react';
import ReccuringExpenses from './ReccuringExpenses';
import { reccuringExpenseAtom, reccuringIncomeAtom } from '@/app/store/atoms';
import { useAtom } from 'jotai';
import ReccuringIncomes from './ReccuringIncomes';
import { TRANSACTION_TYPES } from '@/app/constants/constants';

const ReccurringTransactions = () => {
  const [reccruingExpenses] = useAtom(reccuringExpenseAtom);
  const [reccuringIncomes] = useAtom(reccuringIncomeAtom);
  const [view, setView] = useState(TRANSACTION_TYPES.EXPENSE);

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

      {view === TRANSACTION_TYPES.EXPENSE ? (
        <ReccuringExpenses expenses={reccruingExpenses} />
      ) : (
        <ReccuringIncomes incomes={reccuringIncomes} />
      )}
    </section>
  );
};

export default ReccurringTransactions;
