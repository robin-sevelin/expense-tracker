'use client';

import { useAtom } from 'jotai';
import LogInPage from './components/LogInPage';
import { loggedInAtom } from './store/atoms';
import MainPage from './components/MainPage';
import Loading from './components/Loading';
import { useGetRedirect } from './hooks/useGetRedirect';

export default function Home() {
  const [isLoggedIn] = useAtom(loggedInAtom);
  const { loading } = useGetRedirect();

  if (loading) {
    return <Loading />;
  }

  return <>{isLoggedIn ? <MainPage /> : <LogInPage />}</>;
}
