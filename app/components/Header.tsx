'use client';

import Navigation from './Navigation';
import { useAtom } from 'jotai/react';
import { loggedInAtom } from '../store/atoms';

const Header = () => {
  const [isLoggedIn] = useAtom(loggedInAtom);
  return (
    <header className='flex justify-between'>
      Header
      {isLoggedIn && <Navigation />}
    </header>
  );
};

export default Header;
