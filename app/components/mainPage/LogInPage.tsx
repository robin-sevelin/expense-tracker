'use client';

import { useGetRedirect } from '@/app/hooks/useGetRedirect';
import { signinWithGoogleRedirect } from '@/firebase/auth';

const LogInPage = () => {
  useGetRedirect();

  return (
    <section>
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
    </section>
  );
};

export default LogInPage;
