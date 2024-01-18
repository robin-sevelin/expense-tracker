'use client';

import React, { useEffect, useState } from 'react';
import { useAuthUser } from '../hooks/useAuthUser';
import { zodResolver } from '@hookform/resolvers/zod';
import { TransactionFormData } from '../models/FormData';
import { useForm } from 'react-hook-form';
import { transactionSchema } from '../models/FormSchema';
import ExpenseCategories from './ExpenseCategories';
import IncomeCategories from './IncomeCategories';
import { IUser } from '../models/IUser';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Props {
  onHandleSubmit: (user: IUser, data: TransactionFormData) => void;
}

const AddTransaction = ({ onHandleSubmit }: Props) => {
  const [date, setDate] = useState(new Date());
  const [type, setType] = useState('expense');
  const { user } = useAuthUser();

  useEffect(() => {}, [type]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
  });

  const submitData = async (data: TransactionFormData) => {
    data.date = date;
    console.log(JSON.stringify(data, null, 2));

    onHandleSubmit(user, data);
    reset();
  };

  const handleClick = (type: string) => {
    setType(type);
  };

  return (
    <section className='max-w-xl max-h-3xl m-auto'>
      <div className='flex flex-col justify-center items-center'>
        <h2 className='text-5xl font-bold'>ADD TRANSACTION.</h2>
        <form onSubmit={handleSubmit(submitData)}>
          <div>
            <label htmlFor='datepicker' className='input-label'>
              Transaction Date:
            </label>
            <DatePicker
              id='datepicker'
              className='input input-bordered input-primary w-full max-w-xs'
              selected={date}
              onChange={(date) => setDate(date as Date)}
              shouldCloseOnSelect={false}
            />
          </div>

          <fieldset>
            <legend className='input-label'>Transaction Type:</legend>
            <div className='join'>
              <input
                checked={type === 'expense'}
                className='join-item btn'
                aria-label='EXPENSE'
                type='radio'
                {...register('type')}
                onClick={() => handleClick('expense')}
                name='type'
                value={'expense'}
              />
              <input
                className='join-item btn'
                aria-label='INCOME'
                type='radio'
                {...register('type')}
                onClick={() => handleClick('income')}
                name='type'
                value={'income'}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend className='input-label'>Transaction Category:</legend>
            {type === 'expense' ? (
              <ExpenseCategories register={register} />
            ) : (
              <IncomeCategories register={register} />
            )}
          </fieldset>
          <div className='error-container'>
            {errors.category && (
              <p style={{ color: 'red' }}>{errors.category.message}</p>
            )}
          </div>
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
            aria-label='Amount'
            type='number'
            min={0}
            {...register('amount', { valueAsNumber: true })}
          />
          <div className='error-container'>
            {errors.amount && (
              <p style={{ color: 'red' }}>{errors.amount.message}</p>
            )}
          </div>
          <button className='btn btn-primary'>Submit</button>
        </form>
      </div>
    </section>
  );
};

export default AddTransaction;
