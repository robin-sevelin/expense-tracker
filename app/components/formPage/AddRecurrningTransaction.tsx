'use client';

import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { submitAtom, userAtom } from '@/store/atoms';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import ModalDialog from '@/components/sharedComponents/ModalDialog';
import { useGetDaysInMonthArray } from '@/hooks/useGetDaysInMonthArray';
import { recurringTransactionSchema } from '@/models/FormSchema';
import { createRecurringTransactionDocument } from '../../../firebase/operations/createRecurringTransaction';
import { IRecurringTransaction } from '@/models/IRecurringTransaction';
import { TRANSACTION_TYPES } from '@/constants/constants';

const AddRecurringTransaction = () => {
  const [user] = useAtom(userAtom);
  const [, setIsSubmitted] = useAtom(submitAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { daysInMonthArray } = useGetDaysInMonthArray();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IRecurringTransaction>({
    resolver: zodResolver(recurringTransactionSchema),
  });

  const submitData = async (expense: IRecurringTransaction) => {
    await createRecurringTransactionDocument(user, expense);

    setIsSubmitted(true);
    reset();
    setIsModalOpen(true);
  };

  return (
    <>
      <div className='flex flex-col justify-center items-center'>
        <h2 className='text-3xl font-bold'>SET RECCURING TRANSACTION</h2>
        <form onSubmit={handleSubmit(submitData)}>
          <fieldset>
            <legend className='input-label'>Transaction Type</legend>
            <div className='join'>
              <input
                className='join-item btn'
                aria-label='EXPENSE'
                type='radio'
                {...register('type')}
                name='type'
                value={TRANSACTION_TYPES.EXPENSE}
                defaultChecked
              />
              <input
                className='join-item btn'
                aria-label='INCOME'
                type='radio'
                {...register('type')}
                name='type'
                value={TRANSACTION_TYPES.INCOME}
              />
            </div>
          </fieldset>
          <div className='join'>
            <fieldset>
              <label htmlFor='title' className='input-label'>
                Title:
              </label>
              <input
                type='text'
                className='input input-bordered input-primary w-full max-w-xs'
                aria-label='Title'
                {...register('title')}
              />
              <div className='error-container'>
                {errors.title && (
                  <p style={{ color: 'red' }}>{errors.title.message}</p>
                )}
              </div>
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
            </fieldset>
          </div>
          <legend>Pick day of the month</legend>
          <select
            className='select select-bordered select-primary w-full max-w-xs mb-3'
            id='day'
            {...register('date')}
          >
            {daysInMonthArray.map((days, index) => (
              <option key={index} value={days.day} disabled={days.day > 28}>
                {days.day}
              </option>
            ))}
          </select>
          <button className='btn btn-primary'>Submit</button>
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

export default AddRecurringTransaction;
