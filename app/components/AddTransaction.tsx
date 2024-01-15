'use client';

import React, { FormEvent, useState } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../store/atoms';
import { useAuthUser } from '../hooks/useAuthUser';
import { createTransactionDocument } from '@/firebase/firestore';
import { DATESTAMP, TRANSACTION_TYPES } from '../constants/constants';
import ExpenseCategories from './ExpenseCategories';
import IncomeCategories from './IncomeCategories';
import { v4 as uuidv4 } from 'uuid';

const AddTransaction = () => {
  const [user] = useAtom(userAtom);
  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      id: uuidv4(),
      date: DATESTAMP.toLocaleString(),
      title: title,
      amount: Number(amount),
      type: type,
      category: category,
    };

    await createTransactionDocument(user, formData);
    setType('');
    setTitle('');
    setAmount('');

    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
    }, 2000);
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
        {type === TRANSACTION_TYPES.INCOME && (
          <IncomeCategories onHandleChange={setCategory} />
        )}
        <div className=' m-2'>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            id='title'
            value={title}
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
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button className='btn btn-primary'>Submit</button>
      </form>
      {isSuccess && <div>Success</div>}
    </div>
  );
};

export default AddTransaction;
