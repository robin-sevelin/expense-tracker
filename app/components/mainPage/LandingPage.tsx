'use client';

import React from 'react';
import { useGetRedirect } from '@/hooks/useGetRedirect';
import Loading from '@/components/sharedComponents/Loading';
import LogInPage from './LogInPage';
import MainPage from './MainPage';
import { useIsLoggedIn } from '@/hooks/useIsLoggedIn';
import { useCookies } from 'react-cookie';
import CookieBanner from '@/components/sharedComponents/CookieBanner';

const LandingPage = () => {
  const [cookies, setCookie] = useCookies(['expense-tracker']);
  const { 'expense-tracker': expenseTrackerCookie } = cookies;
  const { isLoading, user } = useGetRedirect();
  useIsLoggedIn();

  const handleCookie = () => {
    setCookie('expense-tracker', user);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {!expenseTrackerCookie && <CookieBanner onHandleChange={handleCookie} />}
      {!user.uid && expenseTrackerCookie && <LogInPage />}
      {user.uid && expenseTrackerCookie && <MainPage />}
    </>
  );
};

export default LandingPage;
