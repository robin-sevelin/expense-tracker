'use client';

import { useAtom } from 'jotai';
import React, { FormEvent, useState } from 'react';
import { userAtom } from '../store/atoms';
import { createBalanceDocument } from '@/firebase/firestore';
import { useGetBalance } from '../hooks/useGetBalance';

const AddBalance = () => {
  const [user] = useAtom(userAtom);
  const [input, setInput] = useState(0);
  useGetBalance();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createBalanceDocument(user, input);
    setInput(0);
  };
  return (
    <div>
      <h2>Edit balance</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='balance'>Amount in SEK</label>{' '}
        <input
          type='number'
          id='balance'
          placeholder='0'
          min={0}
          onChange={(e) => setInput(Number(e.target.value))}
          value={input}
        />
        <button className='btn btn-primary'>Submit</button>
      </form>
    </div>
  );
};

export default AddBalance;
