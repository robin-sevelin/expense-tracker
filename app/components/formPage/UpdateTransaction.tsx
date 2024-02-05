'use client';

import { CURRENT_DATE, TRANSACTION_TYPES } from '@/constants/constants';
import { useGetTransactions } from '@/hooks/useGetTransactions';
import { transactionSchema } from '@/models/FormSchema';
import { ITransaction } from '@/models/ITransaction';
import { submitAtom, transactionByIdAtom, userAtom } from '@/store/atoms';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { updateTransaction } from '../../../firebase/operations/updateTransaction';
import ExpenseCategories from '../sharedComponents/ExpenseCategories';
import IncomeCategories from '../sharedComponents/IncomeCategories';
import Loading from '../sharedComponents/Loading';
import ModalDialog from '../sharedComponents/ModalDialog';
import DatePicker from 'react-datepicker';

const UpdateTransaction = () => {
  const [, setIsSubmitted] = useAtom(submitAtom);
  const [date, setDate] = useState(CURRENT_DATE);
  const [type, setType] = useState(TRANSACTION_TYPES.EXPENSE);
  const [user] = useAtom(userAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionById] = useAtom(transactionByIdAtom);
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
    await updateTransaction(user, data, transactionById.id, date);

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
      <div>
        <h2 className='font-bold'>SET TRANSACTION</h2>
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

export default UpdateTransaction;
