'use client';

import React from 'react';
import { useGetRedirect } from '../hooks/useGetRedirect';
import Loading from './Loading';
import LogInPage from './LogInPage';
import MainPage from './MainPage';
import { useIsLoggedIn } from '../hooks/useIsLoggedIn';

const LandingPage = () => {
  const { loading } = useGetRedirect();
  const { user } = useIsLoggedIn();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='min-h-full w-full bg-white absolute z-0'>
      {user.uid ? <MainPage /> : <LogInPage />}
    </div>
  );
};

export default LandingPage;
