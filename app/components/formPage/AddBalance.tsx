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
        <h2 className='text-5xl font-bold'>EDIT BUDGET</h2>
        <form onSubmit={handleSubmit(submitData)}>
          <h3>Current budget {balance} SEK</h3>
          <div className='join'>
            <fieldset>
              <label htmlFor='balance' className='input-label'>
                Amount:
              </label>
              <input
                className='input input-bordered input-primary w-full max-w-xs'
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
              <button className='btn btn-primary mr-5'>Submit</button>
              <Link href='/pages/profile'>
                <button className='btn btn-secondary'>Return</button>
              </Link>
            </fieldset>
          </div>
        </form>
      </div>
      {isModalOpen && (
        <ModalDialog
          onHandleChange={() => setIsModalOpen(false)}
          isModalOpen={isModalOpen}
        />
      )}
    </section>
  );
};

export default AddBalance;
