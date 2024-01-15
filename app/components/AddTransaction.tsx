'use client';

import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../store/atoms';
import { useAuthUser } from '../hooks/useAuthUser';
import { zodResolver } from '@hookform/resolvers/zod';
import { TransactionFormData } from '../models/TransactionFormData';
import { useForm } from 'react-hook-form';
import { transactionSchema } from '../models/TransactionSchema';
import ExpenseCategories from './ExpenseCategories';
import IncomeCategories from './IncomeCategories';
import { createTransactionDocument } from '@/firebase/firestore';

const AddTransaction = () => {
  const [type, setType] = useState('expense');
  const [user] = useAtom(userAtom);

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
    await createTransactionDocument(user, data);
    reset();
  };

  const handleClick = (type: string) => {
    setType(type);
  };

  useAuthUser(user);

  return (
    <div className='flex flex-col justify-center items-center'>
      <h2>Add transactions</h2>
      <form onSubmit={handleSubmit(submitData)}>
        <label htmlFor='expense'>Expense</label>
        <input
          checked={type === 'expense'}
          type='radio'
          id='expense'
          value={'Expense'}
          {...register('type')}
          onClick={() => handleClick('expense')}
          name='type'
        />
        <label htmlFor='income'>Income</label>
        <input
          type='radio'
          id='income'
          value={'Income'}
          {...register('type')}
          onClick={() => handleClick('income')}
          name='type'
        />
        {type === 'expense' ? (
          <ExpenseCategories register={register} />
        ) : (
          <IncomeCategories register={register} />
        )}
        <div className='error-container'>
          {errors.category && (
            <p style={{ color: 'red' }}>{errors.category.message}</p>
          )}
        </div>

        <label htmlFor='title'>Title</label>

        <input type='text' id='title' {...register('title')} />
        <div className='error-container'>
          {errors.title && (
            <p style={{ color: 'red' }}>{errors.title.message}</p>
          )}
        </div>
        <label htmlFor='amount'>Amount</label>
        <input
          type='number'
          id='age'
          {...register('amount', { valueAsNumber: true })}
        />
        <div className='error-container'>
          {errors.amount && (
            <p style={{ color: 'red' }}>{errors.amount.message}</p>
          )}
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default AddTransaction;
function uuidv4() {
  throw new Error('Function not implemented.');
}
