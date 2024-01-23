'use client';

import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { submitAtom, userAtom } from '../../store/atoms';
import Link from 'next/link';
import { balanceSchema } from '../../models/FormSchema';
import { BalanceFormData } from '../../models/FormData';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { createBalanceDocument } from '@/firebase/operations/createBalance';
import { useGetBalance } from '../../hooks/useGetBalance';
import ModalDialog from '../sharedComponents/ModalDialog';

const AddBalance = () => {
  const [user] = useAtom(userAtom);
  const { balance } = useGetBalance();
  const [, setIsSubmitted] = useAtom(submitAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setIsModalOpen(true);
  };

  return (
    <section className='max-w-xl max-h-3xl m-auto mb-5'>
      <div className='flex flex-col justify-center items-center'>
        <h2 className='text-5xl font-bold'>EDIT BALANCE</h2>
        <form onSubmit={handleSubmit(submitData)}>
          <h3>Current balance {balance} SEK</h3>
          <label htmlFor='balance'>Amount</label>
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
      {isModalOpen && (
        <ModalDialog
          onHandleClick={() => setIsModalOpen(false)}
          isModalOpen={isModalOpen}
        />
      )}
    </section>
  );
};

export default AddBalance;