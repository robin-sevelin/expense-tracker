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
        <button className='btn btn-primary'>Submit</button>
      </form>
    </div>
  );
};

export default AddTransaction;
