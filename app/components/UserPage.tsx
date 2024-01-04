'use client';

import React from 'react';
import { useAtom } from 'jotai';
import { balanceAtom, userAtom } from '../store/atoms';
import { useAuthUser } from '../hooks/useAuthUser';
import AddBalance from './AddBalance';

const UserPage = () => {
  const [user] = useAtom(userAtom);
  const [balance] = useAtom(balanceAtom);
  useAuthUser(user);

  return (
    <>
      <div className='hero bg-base-200'>
        <div className='hero-content flex-col justify-center items-center'>
          <div className='max-w-md'>
            <h2 className='text-5xl font-bold'>User information</h2>
            <p className='py-6'>Name: {user.displayName}</p>
            <p className='py-6'>E-mail: {user.email}</p>
            <p className='py-6'>Balance: {balance} kr</p>
          </div>
        </div>
      </div>
      <div className='hero bg-base-200'>
        <AddBalance />
      </div>
    </>
  );
};

export default UserPage;
