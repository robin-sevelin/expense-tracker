'use client';

import React from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../store/atoms';
import { useAuthUser } from '../hooks/useAuthUser';

const AddTransaction = () => {
  const [user] = useAtom(userAtom);
  useAuthUser(user);

  return (
    <div>
      <h2>Hello from add</h2>
      <form>
        <label htmlFor='title'>Title</label>
        <input type='text' id='title' />
        <label htmlFor='amount' id='amount'>
          Amount
        </label>
        <input type='number' />
        <div className='join'>
          <input
            className='join-item btn btn-outline btn-accent'
            type='radio'
            name='options'
            aria-label='Regular'
          />
          <input
            className='join-item btn btn-outline btn-accent'
            type='radio'
            name='options'
            aria-label='Flow'
          />
        </div>
        <button className='btn btn-primary'>Submit</button>
      </form>
    </div>
  );
};

export default AddTransaction;
