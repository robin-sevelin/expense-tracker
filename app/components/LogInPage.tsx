'use client';

import { signInWithGoogle } from '../services/signInService';
import { getRedirectResult } from 'firebase/auth';
import { useEffect } from 'react';
import { auth } from '@/firebase/auth';

const LogInPage = () => {
  useEffect(() => {
    const getData = async () => {
      const response = await getRedirectResult(auth);
      if (response) {
        console.log(response.user);
      }
    };
    getData();
  }, []);

  const signIn = async () => {
    await signInWithGoogle();
  };

  return (
    <div className='hero bg-base-200'>
      <div className='hero-content text-center'>
        <div className='max-w-md'>
          <h2 className='text-5xl font-bold'>Hello there</h2>
          <p className='py-6'>
            Please login with your google account to use the expense tracker.
          </p>
          <button onClick={signIn} className='btn btn-primary'>
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
