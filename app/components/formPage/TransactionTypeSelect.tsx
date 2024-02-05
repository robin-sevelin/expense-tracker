'use client';

import React, { useState } from 'react';
import AddTransaction from './AddTransaction';
import AddRecurringTransaction from './AddRecurrningTransaction';
import { useAuthUser } from '@/hooks/useAuthUser';
import { RECCURANCY_TYPES } from '../../constants/constants';

const TransactionTypeSelect = () => {
  const [form, setForm] = useState(RECCURANCY_TYPES.ONCE);
  useAuthUser();
  return (
    <div className='flex flex-col justify-center items-center'>
      <fieldset>
        <legend>Select Recurrancy</legend>
        <div className='join'>
          <input
            className='join-item btn'
            type='radio'
            aria-label={RECCURANCY_TYPES.ONCE}
            onClick={() => setForm(RECCURANCY_TYPES.ONCE)}
            defaultChecked
            name='form'
            value={RECCURANCY_TYPES.ONCE}
          />
          <input
            className='join-item btn'
            type='radio'
            name='form'
            aria-label={RECCURANCY_TYPES.RECURRANT}
            onClick={() => setForm(RECCURANCY_TYPES.RECURRANT)}
            value={RECCURANCY_TYPES.RECURRANT}
          />
        </div>
      </fieldset>
      {form === RECCURANCY_TYPES.ONCE ? (
        <AddTransaction />
      ) : (
        <AddRecurringTransaction />
      )}
    </div>
  );
};

export default TransactionTypeSelect;
