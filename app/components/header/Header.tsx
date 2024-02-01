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
    <header className='flex items-center'>
      <div className='flex justify-center'>
        <Link href={'/'} className='btn btn-ghost text-xl'>
          EXPENSE TRACKER
        </Link>
        <ProfileSection />
      </div>
      <div className='nav-section'>
        <ThemeSelector />
        {user.uid && <Navigation />}
      </div>
    </header>
  );
};

export default Header;
