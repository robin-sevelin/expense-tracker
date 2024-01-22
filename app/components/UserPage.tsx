'use client';

import React from 'react';
import { useAuthUser } from '../hooks/useAuthUser';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { balanceAtom } from '../store/atoms';

const UserPage = () => {
  const [balance] = useAtom(balanceAtom);
  const { user } = useAuthUser();

  return (
    <section className='max-w-7xl  m-auto'>
      <div className='hero-content flex-col justify-center items-center'>
        <div className='max-w-md'>
          <h2 className='text-5xl font-bold'>PROFILE.</h2>
          <p className='py-6'>Name: {user.displayName}</p>
          <p className='py-6'>E-mail: {user.email}</p>
        </div>
      </div>
      Your set balance: {balance} kr
      <Link href='/pages/editBalance'>
        <button className='btn btn-primary'>Edit balance</button>
      </Link>
    </section>
  );
};

export default UserPage;
