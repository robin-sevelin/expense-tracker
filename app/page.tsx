'use client';

import { useAtom } from 'jotai';
import { loggedInAtom } from './store/atoms';
import LogInPage from './components/LogInPage';
import MainPage from './components/MainPage';

export default function Home() {
  const [loggedIn] = useAtom(loggedInAtom);
  return <>{loggedIn ? <MainPage /> : <LogInPage />}</>;
}
