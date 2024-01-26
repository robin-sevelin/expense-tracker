'use client';

import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { submitAtom, userAtom } from '../../store/atoms';
import Link from 'next/link';
import { incomeSchema } from '../../models/FormSchema';
import { IncomeFormData } from '../../models/FormData';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import ModalDialog from '../sharedComponents/ModalDialog';
import { createIncomeDocument } from '@/firebase/operations/createIncome';
import { IIncome } from '@/app/models/IIncome';
import { useGetIncomeSum } from '@/app/hooks/useGetIncomeSum';
import { useGetDaysInMonthArray } from '@/app/hooks/useGetDaysInMonthArray';

const AddReccurentIncomes = () => {
  const [user] = useAtom(userAtom);
  const [, setIsSubmitted] = useAtom(submitAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { reccuringIncomesSum } = useGetIncomeSum();
  const { daysInMonthArray } = useGetDaysInMonthArray();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IncomeFormData>({
    resolver: zodResolver(incomeSchema),
  });

  const submitData = async (income: IncomeFormData) => {
    await createIncomeDocument(user, income);
    setIsSubmitted(true);
    reset();
    setIsModalOpen(true);
  };

  return (
    <section className='max-w-3xl max-h-3xl m-auto mb-5'>
      <div className='flex flex-col justify-center items-center'>
        <h2 className='text-5xl font-bold'>SET RECCURING INCOMES</h2>
        <form onSubmit={handleSubmit(submitData)}>
          <h3>Current reccuring Incomes {reccuringIncomesSum} SEK</h3>
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
              <label htmlFor='balance' className='input-label'>
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
            className='select select-bordered w-full max-w-xs'
            id='day'
            {...register('day')}
          >
            {daysInMonthArray.map((days, index) => (
              <option key={index} value={days.day}>
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
    </section>
  );
};

export default AddReccurentIncomes;
