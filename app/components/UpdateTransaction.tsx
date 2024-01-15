'use client';

import { updateTransactionObject } from '@/firebase/firestore';
import { useAtom } from 'jotai';
import React, { FormEvent, useEffect, useState } from 'react';
import { useAuthUser } from '../hooks/useAuthUser';
import { idAtom, submitAtom, transactionAtom, userAtom } from '../store/atoms';
import { useGetTransactionById } from '../hooks/useGetTransactionById';
import Loading from './Loading';
import TransactionById from './TransactionById';

interface Props {
  id: string;
}

const UpdateTransaction = ({ id }: Props) => {
  const [user] = useAtom(userAtom);
  const [, setIsSubmitted] = useAtom(submitAtom);
  const [transaction] = useAtom(transactionAtom);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const { isLoading } = useGetTransactionById(id);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateTransactionObject(user, title, +amount, id);
    setTitle('');
    setAmount('');
    setIsSubmitted(true);
  };

  useAuthUser(user);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className='flex flex-col justify-center items-center'>
          <h2>Update transaction</h2>
          <TransactionById transaction={transaction} key={id} />
          <form onSubmit={handleSubmit}>
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
        </div>
      )}
    </>
  );
};

export default UpdateTransaction;
