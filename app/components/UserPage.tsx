'use client';

import React from 'react';
import { useAuthUser } from '../hooks/useAuthUser';
import Link from 'next/link';
import BalanceAmount from './BalanceAmount';

const UserPage = () => {
  const { user } = useAuthUser();

  return (
    <>
      <>
        <div className='hero bg-base-200'>
          <div className='hero-content flex-col justify-center items-center'>
            <div className='max-w-md'>
              <h2 className='text-5xl font-bold'>User information</h2>
              <p className='py-6'>Name: {user.displayName}</p>
              <p className='py-6'>E-mail: {user.email}</p>
              <BalanceAmount />
            </div>
          </div>
        </div>
        <Link href='/pages/editBalance'>
          <button className='btn btn-primary'>Edit balance</button>
        </Link>
      </>
    </>
  );
};

export default UserPage;
