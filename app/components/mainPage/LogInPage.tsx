'use client';

import { signinWithGoogleRedirect } from '@/firebase/auth';
import { useGetRedirect } from '../../hooks/useGetRedirect';

const LogInPage = () => {
  useGetRedirect();

  return (
    <div className='hero bg-base-200 max-w-4xl'>
      <div className='hero-content text-center'>
        <div className='max-w-md'>
          <h2 className='text-5xl font-bold'>Hello there</h2>
          <p className='py-6'>
            Please login with your google account to use the expense tracker.
          </p>
          <button
            onClick={signinWithGoogleRedirect}
            className='btn btn-primary'
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;