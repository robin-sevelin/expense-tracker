'use client';

import React, { FormEvent, useState } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../store/atoms';
import { useAuthUser } from '../hooks/useAuthUser';
import { createTransactionDocument } from '@/firebase/firestore';
import { TRANSACTION_TYPES } from '../constants/constants';
import ExpenseCategories from './ExpenseCategories';

const AddTransaction = () => {
  const [user] = useAtom(userAtom);
  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      id: Math.random(),
      date: new Date(),
      title: title,
      amount: Number(amount),
      type: type,
      category: category,
    };

    await createTransactionDocument(user, formData);
    setType('');
    setTitle('');
    setAmount('');
  };

  useAuthUser(user);

  return (
    <div className='flex flex-col justify-center items-center'>
      <h2>Add transactions</h2>
      <form onSubmit={handleSubmit}>
        <div className=' m-2'>
          <input
            className='join-item btn m-2'
            type='radio'
            name='type'
            value={'expense'}
            onChange={(e) => setType(e.target.value)}
            aria-label='Expense'
          />

          <input
            className='join-item btn m-2'
            type='radio'
            name='type'
            value={'income'}
            onChange={(e) => setType(e.target.value)}
            aria-label='Income'
          />
        </div>
        {type === TRANSACTION_TYPES.EXPENSE && (
          <ExpenseCategories onHandleChange={setCategory} />
        )}
        <div className=' m-2'>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            id='title'
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className=' m-2'>
          <label htmlFor='amount' id='amount'>
            Amount
          </label>
          <input
            type='number'
            min={0}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button className='btn btn-primary'>Submit</button>
      </form>
    </div>
  );
};

export default AddTransaction;
