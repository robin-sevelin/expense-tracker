'use client';

import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { transactionSchema } from '@/models/FormSchema';
import ExpenseCategories from '@/components/sharedComponents/ExpenseCategories';
import IncomeCategories from '@/components/sharedComponents/IncomeCategories';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { submitAtom, userAtom } from '@/store/atoms';
import { useAtom } from 'jotai';
import { CURRENT_DATE, TRANSACTION_TYPES } from '@/constants/constants';
import ModalDialog from '@/components/sharedComponents/ModalDialog';
import { ITransaction } from '@/models/ITransaction';
import { useGetTransactions } from '@/hooks/useGetTransactions';
import { createTransactionDocument } from '@/../firebase/operations/createTransaction';
import Loading from '../sharedComponents/Loading';

const AddTransaction = () => {
  const [, setIsSubmitted] = useAtom(submitAtom);
  const [date, setDate] = useState(CURRENT_DATE);
  const [type, setType] = useState(TRANSACTION_TYPES.EXPENSE);
  const [user] = useAtom(userAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoading } = useGetTransactions();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ITransaction>({
    resolver: zodResolver(transactionSchema),
  });

  const submitData = async (data: ITransaction) => {
    await createTransactionDocument(user, data, date);

    setIsSubmitted(true);
    setIsModalOpen(true);
    reset();
  };

  if (isLoading) {
    return <Loading />;
  }

  const handleClick = (type: string) => {
    setType(type);
  };

  return (
    <>
      <h3 className='font-bold'>SET TRANSACTION</h3>
      <form onSubmit={handleSubmit(submitData)}>
        <div>
          <legend>Select date</legend>
          <DatePicker
            id='datepicker'
            className='input input-bordered input-primary w-full max-w-xs'
            selected={date}
            onChange={(date) => setDate(date as Date)}
            shouldCloseOnSelect={false}
          />
        </div>
        <fieldset>
          <legend className='input-label'>Transaction Type</legend>
          <div className='join'>
            <input
              className='join-item btn'
              aria-label='EXPENSE'
              type='radio'
              {...register('type')}
              onClick={() => handleClick(TRANSACTION_TYPES.EXPENSE)}
              name='type'
              value={TRANSACTION_TYPES.EXPENSE}
              defaultChecked
            />
            <input
              className='join-item btn'
              aria-label='INCOME'
              type='radio'
              {...register('type')}
              onClick={() => handleClick(TRANSACTION_TYPES.INCOME)}
              name='type'
              value={TRANSACTION_TYPES.INCOME}
            />
          </div>
        </fieldset>

        <fieldset>
          <legend className='input-label'>Transaction Category</legend>
          {type === TRANSACTION_TYPES.EXPENSE ? (
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
      {isModalOpen && (
        <ModalDialog
          onHandleChange={() => setIsModalOpen(false)}
          isModalOpen={isModalOpen}
        />
      )}
    </>
  );
};

export default AddTransaction;
