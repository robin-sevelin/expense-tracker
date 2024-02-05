'use client';

import React from 'react';
import { userAtom } from '@/store/atoms';
import { useAtom } from 'jotai';
import { signOut } from 'firebase/auth';
import { auth } from '@/../firebase/auth';
import { USER_BASE_VALUES } from '@/constants/baseValues';

const ProfileSection = () => {
  const [user] = useAtom(userAtom);
  const [, setUser] = useAtom(userAtom);

  const logOut = async () => {
    await signOut(auth);
    setUser(USER_BASE_VALUES);
  };

  return (
    <>
      <picture>
        <img
          src={user.photoURL}
          alt={user.displayName}
          width={20}
          height={20}
          loading='lazy'
          className=' rounded-full shadow-2xl '
        />
      </picture>
      <button aria-label='sign out' onClick={logOut} className='btn btn-error'>
        Sign out
      </button>
    </>
  );
};

export default ProfileSection;
