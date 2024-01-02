'use client';

import { useAtom } from 'jotai';
import LogInPage from './components/LogInPage';
import { loggedInAtom } from './store/atoms';
import MainPage from './components/MainPage';

export default function Home() {
  const [isLoggedIn] = useAtom(loggedInAtom);
  return <>{isLoggedIn ? <MainPage /> : <LogInPage />}</>;
}
