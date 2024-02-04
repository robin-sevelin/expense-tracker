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
        <div className='nav-section w-[164px] h-[74px]'>
          {user.uid && <Navigation />}
          <ThemeSelector />
        </div>
        <Link href={'/'} className='btn btn-ghost text-xl '>
          EXPENSE TRACKER
        </Link>
        <div className='w-[164px] h-[74px]'>
          {user.uid && <ProfileSection />}
        </div>
      </header>
    </>
  );
};

export default Header;
