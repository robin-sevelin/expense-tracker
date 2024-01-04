'use client';

import { useAtom } from 'jotai';
import React, { FormEvent, useEffect, useState } from 'react';
import { balanceAtom, userAtom } from '../store/atoms';
import { createTransactionDocument, db } from '@/firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';

const AddBalance = () => {
  const [user] = useAtom(userAtom);
  const [input, setInput] = useState(0);
  const [, setBalance] = useAtom(balanceAtom);

  useEffect(() => {
    const getBalance = async () => {
      const docRef = doc(db, 'transactions', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const docData = docSnap.data();
        const balance = docData.balance;
        setBalance(balance);
      } else {
        console.log('No such document!');
      }
    };
    getBalance();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createTransactionDocument(user, input);
    setInput(0);
  };
  return (
    <div>
      <h2>Edit balance</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='balance'>Amount in SEK</label>{' '}
        <input
          type='number'
          id='balance'
          placeholder='0'
          min={0}
          onChange={(e) => setInput(Number(e.target.value))}
          value={input}
        />
        <button className='btn btn-primary'>Submit</button>
      </form>
    </div>
  );
};

export default AddBalance;
