'use client';

import Navigation from './Navigation';
import { useAtom } from 'jotai';
import { userAtom } from '../../store/atoms';
import Link from 'next/link';
import ThemeSelector from './ThemeSelector';
import ProfileSection from '../mainPage/ProfileSection';

const Header = () => {
  const [user] = useAtom(userAtom);

  return (
    <header>
      <div>
        <Link href={'/'} className='btn btn-ghost text-xl'>
          EXPENSE TRACKER
        </Link>
        <ProfileSection />
      </div>
      <div className=''>
        <ThemeSelector />
        {user.uid && <Navigation />}
      </div>
    </header>
  );
};

export default Header;
