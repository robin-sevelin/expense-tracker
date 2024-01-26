'use client';

import React, { useState } from 'react';
import AddBalance from '../formPage/AddBalance';
import AddReccurentExpenses from '../formPage/AddReccurentExpenses';
import AddReccurentIncomes from '../formPage/AddReccurentIncomes';

const UserValues = () => {
  const [section, setSection] = useState('budget');
  return (
    <div>
      <div className='join'>
        <fieldset>
          <legend>Select section</legend>
          <input
            className='join-item btn'
            type='radio'
            name='options'
            aria-label='Budget'
            defaultChecked
            id='budget'
            value='budget'
            onClick={() => setSection('budget')}
          />
          <input
            className='join-item btn'
            type='radio'
            name='options'
            aria-label='Expenses'
            id='expenses'
            value='expenes'
            onClick={() => setSection('expenses')}
          />
          <input
            className='join-item btn'
            type='radio'
            name='options'
            aria-label='Incomes'
            id='incomes'
            value='incomes'
            onClick={() => setSection('incomes')}
          />
        </fieldset>
      </div>
      {section == 'budget' && <AddBalance />}
      {section == 'expenses' && <AddReccurentExpenses />}
      {section == 'incomes' && <AddReccurentIncomes />}
    </div>
  );
};

export default UserValues;
