'use client';

import React, { FormEvent, useState } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../store/atoms';
import { useAuthUser } from '../hooks/useAuthUser';

const AddTransaction = () => {
  const [user] = useAtom(userAtom);
  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = { type: type, title: title, amount: amount };

    alert(JSON.stringify(formData, null, 2));
  };

  useAuthUser(user);

  return (
    <div className='flex flex-col justify-center items-center'>
      <h2>Add transactions</h2>
      <form onSubmit={handleSubmit}>
        <div className=' m-2'>
          <input
            className='join-item btn m-2'
            type='radio'
            name='type'
            value={'expense'}
            onChange={(e) => setType(e.target.value)}
            aria-label='Expense'
          />
          <input
            className='join-item btn m-2'
            type='radio'
            name='type'
            value={'income'}
            onChange={(e) => setType(e.target.value)}
            aria-label='Income'
          />
        </div>
        <div className=' m-2'>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            id='title'
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className=' m-2'>
          <label htmlFor='amount' id='amount'>
            Amount
          </label>
          <input
            type='number'
            min={0}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button className='btn btn-primary'>Submit</button>
      </form>
    </div>
  );
};

export default AddTransaction;
