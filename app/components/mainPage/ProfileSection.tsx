'use client';

import React from 'react';
import { userAtom } from '@/store/atoms';
import { useAtom } from 'jotai';
import { signOut } from 'firebase/auth';
import { auth } from '@/../firebase/auth';
import { USER_BASE_VALUES } from '@/constants/baseValues';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import MediaQuery from 'react-responsive';
import Link from 'next/link';

const ProfileSection = () => {
  const [user, setUser] = useAtom(userAtom);

  const logOut = async () => {
    await signOut(auth);
    setUser(USER_BASE_VALUES);
  };

  return (
    <div className='flex justify-center items-center'>
      <Link href='/pages/profile'>
        <picture className='m-1'>
          <img
            src={user.photoURL}
            alt={user.displayName}
            width={50}
            height={50}
            loading='lazy'
            className=' rounded-full shadow-2xl m-1 '
          />
        </picture>
      </Link>
      <button
        aria-label='sign out'
        onClick={logOut}
        className='btn btn-secondary m-1'
      >
        <MediaQuery maxWidth={1224}>
          <RiLogoutCircleRLine />
        </MediaQuery>
        <MediaQuery minWidth={1225}>
          <span>Sign out</span>
        </MediaQuery>
      </button>
    </div>
  );
};

export default ProfileSection;
