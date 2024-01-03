'use client';

import React from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../store/atoms';
import { useAuthUser } from '../hooks/useAuthUser';

const UserPage = () => {
  const [user] = useAtom(userAtom);
  useAuthUser(user);

  return (
    <div className='hero bg-base-200'>
      <div className='hero-content flex-col justify-center items-center'>
        <div className='max-w-md'>
          <h2 className='text-5xl font-bold'>User information</h2>
          <picture>
            <img
              src={user.photoURL}
              alt={user.displayName}
              width={75}
              height={75}
              loading='lazy'
              className=' rounded-full shadow-2xl '
            />
          </picture>
          <p className='py-6'>Name: {user.displayName}</p>
          <p className='py-6'>E-mail: {user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
