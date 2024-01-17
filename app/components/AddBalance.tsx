'use client';

import { useAtom } from 'jotai';
import React from 'react';
import { submitAtom, userAtom } from '../store/atoms';
import Link from 'next/link';
import BalanceAmount from './BalanceAmount';
import { balanceSchema } from '../models/FormSchema';
import { BalanceFormData } from '../models/FormData';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { createBalanceDocument } from '@/firebase/operations/createBalance';

const AddBalance = () => {
  const [user] = useAtom(userAtom);
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

  return (
    <section className='max-w-3xl max-h-3xl m-auto'>
      <h2>Edit balance</h2>
      <BalanceAmount />
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
    </section>
  );
};

export default AddBalance;
