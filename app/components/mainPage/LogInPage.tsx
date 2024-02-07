'use client';

import { useGetRedirect } from '@/hooks/useGetRedirect';
import { signinWithGoogleRedirect } from '@/../firebase/auth';
import { TEAM } from '@/constants/constants';

const LogInPage = () => {
  useGetRedirect();

  return (
    <>
      <section>
        <div className='hero-content flex-col lg:flex-row-reverse bg-base-200 rounded-md'>
          <picture>
            <img
              src={TEAM}
              alt='google logo'
              width={200}
              height={200}
              loading='lazy'
            />
          </picture>
          <div>
            <h2 className='text-xl font-bold'>
              Sign in with Google to use the expense tracker.
            </h2>
            <button
              onClick={signinWithGoogleRedirect}
              className='btn  btn-primary'
            >
              <span>Sign In</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default LogInPage;
