'use client';

import React from 'react';
import { userAtom } from '@/store/atoms';
import { useAtom } from 'jotai';
import { USER_BASE_VALUES } from '@/constants/constants';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase/auth';

const ProfileSection = () => {
  const [user] = useAtom(userAtom);
  const [, setUser] = useAtom(userAtom);
  const logOut = async () => {
    await signOut(auth);
    setUser(USER_BASE_VALUES);
  };

  return (
    <>
      {user.uid && (
        <div>
          <picture className=' p-2 m-1'>
            <img
              src={user.photoURL}
              alt={user.displayName}
              width={50}
              height={50}
              loading='lazy'
              className=' rounded-full shadow-2xl '
            />
          </picture>
          <button
            aria-label='sign out'
            onClick={logOut}
            className='btn btn-error w-20 m-1'
          >
            Sign out
          </button>
        </div>
      )}
    </>
  );
};

export default ProfileSection;
