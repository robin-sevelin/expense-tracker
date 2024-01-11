'use client';

import { useAtom } from 'jotai';
import React, { FormEvent, useState } from 'react';
import { balanceAtom, submitAtom, userAtom } from '../store/atoms';
import { createBalanceDocument } from '@/firebase/firestore';
import Link from 'next/link';
import { useGetBalance } from '../hooks/useGetBalance';
import BalanceAmount from './BalanceAmount';

const AddBalance = () => {
  const [user] = useAtom(userAtom);
  const [input, setInput] = useState('');
  const [balance] = useAtom(balanceAtom);
  const [, setIsSubmitted] = useAtom(submitAtom);
  useGetBalance();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createBalanceDocument(user, Number(input));
    setInput('');
    setIsSubmitted(true);
  };

  return (
    <div>
      <h2>Edit balance</h2>
      <BalanceAmount key={balance} />
      <form onSubmit={handleSubmit}>
        <label htmlFor='balance'>Amount in SEK</label>
        <input
          type='number'
          id='balance'
          placeholder='0'
          min={0}
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <button className='btn btn-primary'>Submit</button>
        <Link href='/pages/profile'>
          <button className='btn btn-secondary'>Return</button>
        </Link>
      </form>
    </div>
  );
};

export default AddBalance;
