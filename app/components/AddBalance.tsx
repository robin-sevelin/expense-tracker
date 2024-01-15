'use client';

import { useAtom } from 'jotai';
import React from 'react';
import { balanceAtom, submitAtom, userAtom } from '../store/atoms';
import { createBalanceDocument } from '@/firebase/firestore';
import Link from 'next/link';
import { useGetBalance } from '../hooks/useGetBalance';
import BalanceAmount from './BalanceAmount';
import { balanceSchema } from '../models/FormSchema';
import { BalanceFormData } from '../models/FormData';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const AddBalance = () => {
  const [user] = useAtom(userAtom);
  const [balance] = useAtom(balanceAtom);
  const [, setIsSubmitted] = useAtom(submitAtom);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BalanceFormData>({
    resolver: zodResolver(balanceSchema),
  });

  const submitData = async (data: BalanceFormData) => {
    await createBalanceDocument(user, data.balance);
    setIsSubmitted(true);
    reset();
  };

  useGetBalance();
  return (
    <div>
      <h2>Edit balance</h2>
      <BalanceAmount key={balance} balance={balance} />
      <form onSubmit={handleSubmit(submitData)}>
        <label htmlFor='balance'>Amount in SEK</label>
        <input
          type='number'
          id='balance'
          {...register('balance', { valueAsNumber: true })}
          name='balance'
        />
        <div className='error-container'>
          {errors.balance && (
            <p style={{ color: 'red' }}>{errors.balance.message}</p>
          )}
        </div>

        <button className='btn btn-primary'>Submit</button>
        <Link href='/pages/profile'>
          <button className='btn btn-secondary'>Return</button>
        </Link>
      </form>
    </div>
  );
};

export default AddBalance;
