'use client';

import { useAtom } from 'jotai';
import React from 'react';
import { signInWithGoogle } from '../services/signInService';
import { loggedInAtom, userAtom } from '../store/atoms';
import { IUser } from '../models/IUser';

const LogInPage = () => {
  const [, setUser] = useAtom(userAtom);
  const [, setIsLoggedIn] = useAtom(loggedInAtom);
  const handleClick = async () => {
    const data = (await signInWithGoogle()) as IUser;
    setUser(data);
    setIsLoggedIn(true);
  };
  return (
    <div className='hero bg-base-200'>
      <div className='hero-content text-center'>
        <div className='max-w-md'>
          <h2 className='text-5xl font-bold'>Hello there</h2>
          <p className='py-6'>
            Please login with your google account to use the expense tracker.
          </p>
          <button onClick={handleClick} className='btn btn-primary'>
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
