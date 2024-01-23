'use client';

import Navigation from './Navigation';
import { auth } from '@/firebase/auth';
import { signOut } from 'firebase/auth';
import { USER_BASE_VALUES } from '../../constants/constants';
import { useAtom } from 'jotai';
import { userAtom } from '../../store/atoms';
import BalanceAmount from '../sharedComponents/BalanceAmount';
import ProfilePicture from './ProfilePicture';
import Link from 'next/link';
import ThemeSelector from './ThemeSelector';

const Header = () => {
  const [user, setUser] = useAtom(userAtom);

  const logOut = async () => {
    await signOut(auth);
    setUser(USER_BASE_VALUES);
  };
  return (
    <header className='navbar bg-base-100 flex justify-between'>
      <div className=' p-2 m-1'>
        <Link href={'/'} className='btn btn-ghost text-xl'>
          EXPENSE TRACKER
        </Link>
        {user.uid && (
          <div className='p-2 m-1 flex items-center'>
            <ProfilePicture user={user} />
            <BalanceAmount />
            <div className='p-2 m-1'>
              <button
                aria-label='sign out'
                onClick={logOut}
                className='btn btn-error'
              >
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>

      {user.uid && (
        <div className='p-2 m-1'>
          <ThemeSelector />
          <Navigation />
        </div>
      )}
    </header>
  );
};

export default Header;
