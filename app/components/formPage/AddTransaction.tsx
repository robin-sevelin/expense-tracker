'use client';

import React, { useState } from 'react';
import { useAuthUser } from '../../hooks/useAuthUser';
import { zodResolver } from '@hookform/resolvers/zod';
import { TransactionFormData } from '../../models/FormData';
import { useForm } from 'react-hook-form';
import { transactionSchema } from '../../models/FormSchema';
import ExpenseCategories from '../sharedComponents/ExpenseCategories';
import IncomeCategories from '../sharedComponents/IncomeCategories';
import { IUser } from '../../models/IUser';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { submitAtom } from '../../store/atoms';
import { useAtom } from 'jotai';
import { CURRENT_DATE } from '../../constants/constants';
import ModalDialog from '../sharedComponents/ModalDialog';

interface Props {
  onHandleSubmit: (user: IUser, data: TransactionFormData, date: Date) => void;
}

const AddTransaction = ({ onHandleSubmit }: Props) => {
  const [, setIsSubmitted] = useAtom(submitAtom);
  const [date, setDate] = useState(CURRENT_DATE);
  const [type, setType] = useState('expense');
  const { user } = useAuthUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
  });

  const submitData = async (data: TransactionFormData) => {
    onHandleSubmit(user, data, date);
    setIsSubmitted(true);
    reset();
    setIsModalOpen(true);
  };

  const handleClick = (type: string) => {
    setType(type);
  };

  return (
    <section className='max-w-xl max-h-3xl m-auto mb-5'>
      <div className='flex flex-col justify-center items-center'>
        <h2 className='text-5xl font-bold'>ADD TRANSACTION</h2>
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
            <legend className='input-label'>Reccuracy:</legend>
            <div className='join'>
              <input
                className='join-item btn'
                aria-label='ONCE'
                type='radio'
                {...register('reccurancy')}
                name='reccurancy'
                value={'once'}
                defaultChecked
              />
              <input
                className='join-item btn'
                aria-label='RECCURING'
                type='radio'
                {...register('reccurancy')}
                name='reccurancy'
                value={'reccuring'}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend className='input-label'>Transaction Type:</legend>
            <div className='join'>
              <input
                className='join-item btn'
                aria-label='EXPENSE'
                type='radio'
                {...register('type')}
                onClick={() => handleClick('expense')}
                name='type'
                value={'expense'}
                defaultChecked
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
      {isModalOpen && (
        <ModalDialog
          onHandleClick={() => setIsModalOpen(false)}
          isModalOpen={isModalOpen}
        />
      )}
    </section>
  );
};

export default AddTransaction;
