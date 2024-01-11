'use client';

import { updateTransactionObject } from '@/firebase/firestore';
import { useAtom } from 'jotai';
import React, { FormEvent, useState } from 'react';
import { useAuthUser } from '../hooks/useAuthUser';
import { userAtom } from '../store/atoms';

interface Props {
  id: string;
}

const UpdateTransaction = ({ id }: Props) => {
  const [user] = useAtom(userAtom);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await updateTransactionObject(user, title, +amount, id);
    setTitle('');
    setAmount('');
  };

  useAuthUser(user);
  return (
    <div className='flex flex-col justify-center items-center'>
      <h2>Add transactions</h2>
      <form onSubmit={handleSubmit}>
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

export default UpdateTransaction;
