'use client';

import React from 'react';
import { useAuthUser } from '../../hooks/useAuthUser';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { balanceAtom } from '../../store/atoms';

const UserPage = () => {
  const [balance] = useAtom(balanceAtom);
  const { user } = useAuthUser();

  return (
    <div className=' hero min-h-full bg-base-200'>
      <div className='hero-content flex-col lg:flex-row-reverse'>
        <picture>
          <img
            src='/vecteezy_business-people-are-discussing-work-plans_4579166.jpg'
            className='max-w-sm rounded-lg shadow-2xl'
            alt='img'
            loading='lazy'
          />
        </picture>
        <div>
          <h2 className='text-5xl font-bold'>PROFILE</h2>
          <p className='py-3'>Name: {user.displayName}</p>
          <p className='py-3'>E-mail: {user.email}</p>
          <p className='py-3'>Your monthtly budget: {balance} kr</p>
          <Link href='/pages/editUserValues' className='btn btn-primary py-3'>
            <span>Edit budget</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
