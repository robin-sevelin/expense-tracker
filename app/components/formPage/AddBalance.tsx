'use client';

import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { submitAtom, userAtom } from '@/store/atoms';
import Link from 'next/link';
import { balanceSchema } from '@/models/FormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { createBalanceDocument } from '@/../firebase/operations/createBalance';
import { useGetBalance } from '@/hooks/useGetBalance';
import ModalDialog from '@/components/sharedComponents/ModalDialog';
import { IBalance } from '@/models/IBalance.ts';
import Loading from '../sharedComponents/Loading';

const AddBalance = () => {
  const [user] = useAtom(userAtom);
  const { balance, isLoading } = useGetBalance();
  const [, setIsSubmitted] = useAtom(submitAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IBalance>({
    resolver: zodResolver(balanceSchema),
  });

  const submitData = async (data: IBalance) => {
    await createBalanceDocument(user, data);
    setIsSubmitted(true);
    reset();
    setIsModalOpen(true);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className='flex flex-col justify-center items-center'>
        <h2 className='text-3xl font-bold'>SET BUDGET</h2>
        <form onSubmit={handleSubmit(submitData)}>
          <h3>Current budget {balance} SEK</h3>
          <div className='join'>
            <fieldset>
              <label htmlFor='amount' className='input-label'>
                Amount:
              </label>
              <input
                className='input input-bordered input-primary w-full max-w-xs'
                type='number'
                id='amount'
                {...register('amount', { valueAsNumber: true })}
                name='amount'
              />
              <div className='error-container'>
                {errors.amount && (
                  <p style={{ color: 'red' }}>{errors.amount.message}</p>
                )}
              </div>
              <button className='btn btn-primary mr-5'>Submit</button>
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
    </>
  );
};

export default AddBalance;
