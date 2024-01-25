'use client';

import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { submitAtom, userAtom } from '../../store/atoms';
import Link from 'next/link';
import { balanceSchema, expenseSchema } from '../../models/FormSchema';
import { BalanceFormData, ExpenseFormData } from '../../models/FormData';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useGetBalance } from '../../hooks/useGetBalance';
import ModalDialog from '../sharedComponents/ModalDialog';
import { createExpenseDocument } from '@/firebase/operations/createExpense';
import { useGetExpenses } from '@/app/hooks/useGetExpenses';

const AddReccurentExpenses = () => {
  const [user] = useAtom(userAtom);
  const { expense } = useGetExpenses();
  const [, setIsSubmitted] = useAtom(submitAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
  });

  const submitData = async (expense: ExpenseFormData) => {
    await createExpenseDocument(user, expense);
    setIsSubmitted(true);
    reset();
    setIsModalOpen(true);
  };

  return (
    <section className='max-w-3xl max-h-3xl m-auto mb-5'>
      <div className='flex flex-col justify-center items-center'>
        <h2 className='text-5xl font-bold'>SET RECCURING EXPENSES</h2>
        <form onSubmit={handleSubmit(submitData)}>
          <h3>Current reccuring expenses {expense} SEK</h3>
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

export default AddReccurentExpenses;
