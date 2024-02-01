'use client';

import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { submitAtom, userAtom } from '@/store/atoms';
import { incomeSchema } from '@/models/FormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import ModalDialog from '@/components/sharedComponents/ModalDialog';
import { createIncomeDocument } from '@/../firebase/operations/createIncome';
import { useGetIncomeSum } from '@/hooks/useGetIncomeSum';
import { useGetDaysInMonthArray } from '@/hooks/useGetDaysInMonthArray';
import { IRecurringIncome } from '@/models/BudgetValues';

const AddReccurentIncomes = () => {
  const [user] = useAtom(userAtom);
  const [, setIsSubmitted] = useAtom(submitAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { recurringIncomeSum } = useGetIncomeSum();
  const { daysInMonthArray } = useGetDaysInMonthArray();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IRecurringIncome>({
    resolver: zodResolver(incomeSchema),
  });

  const submitData = async (income: IRecurringIncome) => {
    await createIncomeDocument(user, income);
    setIsSubmitted(true);
    reset();
    setIsModalOpen(true);
  };

  return (
    <>
      <div className='flex flex-col justify-center items-center'>
        <h2 className='text-3xl font-bold'>SET RECCURING INCOMES</h2>
        <form onSubmit={handleSubmit(submitData)}>
          <h3>Current reccuring Incomes {recurringIncomeSum} SEK</h3>
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
            className='select select-bordered w-full max-w-xs select-primary'
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

export default AddReccurentIncomes;
