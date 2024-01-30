'use client';

import React from 'react';
import { useGetRedirect } from '../../hooks/useGetRedirect';
import Loading from '../sharedComponents/Loading';
import LogInPage from './LogInPage';
import MainPage from './MainPage';
import { useIsLoggedIn } from '../../hooks/useIsLoggedIn';
import { useCookies } from 'react-cookie';
import CookieBanner from '../sharedComponents/CookieBanner';

const LandingPage = () => {
  const [{ 'expense-tracker': expenseTrackerCookie }, setCookie] = useCookies([
    'expense-tracker',
  ]);
  const { loading } = useGetRedirect();
  const { user } = useIsLoggedIn();

  const handleCookie = () => {
    setCookie('expense-tracker', user);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {user.uid && expenseTrackerCookie && <MainPage />}
      {!expenseTrackerCookie && <CookieBanner onHandleChange={handleCookie} />}
      {!user.uid && expenseTrackerCookie && <LogInPage />}
    </>
  );
};

export default LandingPage;
