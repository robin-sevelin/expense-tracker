'use client';

import Navigation from './Navigation';
import { useAtom } from 'jotai';
import { userAtom } from '@/store/atoms';
import Link from 'next/link';
import ThemeSelector from './ThemeSelector';
import ProfileSection from '../mainPage/ProfileSection';

const Header = () => {
  const [user] = useAtom(userAtom);

  return (
    <>
      <header className='flex justify-between w-full'>
        <div className='flex gap-2'>
          {user.uid && <Navigation />}
          {user.uid && <ThemeSelector />}
        </div>
        <Link href={'/'} className='btn btn-ghost text-xl m-auto'>
          <h1> EXPENSE TRACKER</h1>
        </Link>
        {user.uid && <ProfileSection />}
      </header>
    </>
  );
};

export default Header;
