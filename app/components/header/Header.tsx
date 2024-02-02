'use client';

import Navigation from './Navigation';
import { useAtom } from 'jotai';
import { userAtom } from '@/store/atoms';
import Link from 'next/link';
import ThemeSelector from './ThemeSelector';
import ProfileSection from '../mainPage/ProfileSection';
import ProgressBar from '../ProgressBar';

const Header = () => {
  const [user] = useAtom(userAtom);

  return (
    <>
      <header className='flex justify-between'>
        <div className='nav-section'>
          {user.uid && <Navigation />}
          <ThemeSelector />
        </div>

        <Link href={'/'} className='btn btn-ghost text-xl'>
          EXPENSE TRACKER
        </Link>
        <ProfileSection />
      </header>
      {user.uid && <ProgressBar />}
    </>
  );
};

export default Header;
