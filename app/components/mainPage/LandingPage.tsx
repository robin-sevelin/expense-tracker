'use client';

import React from 'react';
import { useGetRedirect } from '../../hooks/useGetRedirect';
import Loading from '../sharedComponents/Loading';
import LogInPage from './LogInPage';
import MainPage from './MainPage';
import { useIsLoggedIn } from '../../hooks/useIsLoggedIn';
import { useCookies } from 'react-cookie';
import CookieBanner from '../sharedComponents/CookieBanner';
import { useGetTransactions } from '@/app/hooks/useGetTransactions';
import { useGetBalance } from '@/app/hooks/useGetBalance';
import { useGetIncomeSum } from '@/app/hooks/useGetIncomeSum';
import { useGetExpenseSum } from '@/app/hooks/useGetExpenseSum';

const LandingPage = () => {
  const [{ 'expense-tracker': expenseTrackerCookie }, setCookie] = useCookies([
    'expense-tracker',
  ]);
  const { loading } = useGetRedirect();
  const { user } = useIsLoggedIn();
  useGetTransactions();
  useGetBalance();
  useGetIncomeSum();

  const handleCookie = () => {
    setCookie('expense-tracker', user);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {user.uid && <MainPage />}
      {!expenseTrackerCookie && <CookieBanner onHandleChange={handleCookie} />}
      {!user.uid && expenseTrackerCookie && <LogInPage />}
    </>
  );
};

export default LandingPage;
