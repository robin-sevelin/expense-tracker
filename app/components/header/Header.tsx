'use client';

import Navigation from './Navigation';
import { useAtom } from 'jotai';
import { userAtom } from '@/store/atoms';
import Link from 'next/link';
import ThemeSelector from './ThemeSelector';
import MediaQuery from 'react-responsive';
import ProfileSection from '../mainPage/ProfileSection';

const Header = () => {
  const [user] = useAtom(userAtom);

  return (
    <>
      <header className='flex justify-between w-full'>
        <div>
          {user.uid && <Navigation />}
          {user.uid && <ThemeSelector />}
        </div>
        <Link href={'/'} className='btn btn-ghost text-xl'>
          EXPENSE TRACKER
        </Link>
        <MediaQuery minWidth={1225}>
          {user.uid && <ProfileSection />}
        </MediaQuery>
      </header>
    </>
  );
};

export default Header;
