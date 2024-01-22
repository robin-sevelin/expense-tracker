'use client';

import Navigation from './Navigation';
import { auth } from '@/firebase/auth';
import { signOut } from 'firebase/auth';
import { USER_BASE_VALUES } from '../../constants/constants';
import { useAtom } from 'jotai';
import { userAtom } from '../../store/atoms';
import BalanceAmount from '../BalanceAmount';
import ProfilePicture from './ProfilePicture';
import { useState } from 'react';
import { Squash as Hamburger } from 'hamburger-react';

const Header = () => {
  const [user, setUser] = useAtom(userAtom);

  const logOut = async () => {
    await signOut(auth);
    setUser(USER_BASE_VALUES);
  };
  return (
    <header className='navbar bg-base-100 flex justify-between'>
      <div className=' p-2 m-1'>
        <a className='btn btn-ghost text-xl'>EXPENSE TRACKER</a>
        {user.uid && (
          <div className='p-2 m-1 flex items-center'>
            <ProfilePicture user={user} />
            <BalanceAmount />
            <div className='p-2 m-1'>
              <button
                aria-label='sign out'
                onClick={logOut}
                className='btn btn-error'
              >
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>

      {user.uid && (
        <div className='p-2 m-1'>
          <Navigation />
        </div>
      )}
    </header>
  );
};

export default Header;
