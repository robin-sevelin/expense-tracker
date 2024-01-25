'use client';

import Navigation from './Navigation';
import { useAtom } from 'jotai';
import { userAtom } from '../../store/atoms';
import BalanceAmount from '../sharedComponents/BalanceAmount';
import ProfilePicture from './ProfilePicture';
import Link from 'next/link';
import ThemeSelector from './ThemeSelector';
import ProfileSection from '../mainPage/ProfileSection';

const Header = () => {
  const [user] = useAtom(userAtom);

  return (
    <header className='bg-base-100 flex justify-between navbar'>
      <div>
        <Link href={'/'} className='btn btn-ghost text-xl'>
          EXPENSE TRACKER
        </Link>
        <ProfileSection />
      </div>

      <div>
        <ThemeSelector />
        {user.uid && <Navigation />}
      </div>
    </header>
  );
};

export default Header;
