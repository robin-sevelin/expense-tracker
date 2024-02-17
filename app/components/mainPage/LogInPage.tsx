'use client';

import { useGetRedirect } from '@/hooks/useGetRedirect';
import { signinWithGoogleRedirect } from '@/../firebase/auth';
import TeamLogo from './TeamLogo';

const LogInPage = () => {
  useGetRedirect();

  return (
    <section>
      <div className='hero-content flex-col lg:flex-row-reverse bg-base-200 rounded-md'>
        <TeamLogo />
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
  );
};

export default LogInPage;
