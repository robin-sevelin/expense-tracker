'use client';

import React, { useState } from 'react';
import ReccuringExpenses from './RecurringExpenses';
import { reccuringExpenseAtom, reccuringIncomeAtom } from '@/store/atoms';
import { useAtom } from 'jotai';
import ReccuringIncomes from './ReccuringIncomes';
import { TRANSACTION_TYPES } from '@/constants/constants';
import Loading from '../sharedComponents/Loading';

const RecurringTransactions = () => {
  const [reccruingExpenses] = useAtom(reccuringExpenseAtom);
  const [reccuringIncomes] = useAtom(reccuringIncomeAtom);
  const [view, setView] = useState(TRANSACTION_TYPES.EXPENSE);

  if (!reccruingExpenses || !reccuringIncomes) {
    return <Loading />;
  }
  return (
    <section className='centered-container'>
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

export default RecurringTransactions;
