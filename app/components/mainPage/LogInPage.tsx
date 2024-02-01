'use client';

import { useGetRedirect } from '@/app/hooks/useGetRedirect';
import { signinWithGoogleRedirect } from '@/firebase/auth';

const LogInPage = () => {
  useGetRedirect();

  return (
    <>
      <div className='hero-content text-center'>
        <div className='max-w-md'>
          <h2 className='text-5xl font-bold'>Welcome</h2>
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
    </>
  );
};

export default LogInPage;
