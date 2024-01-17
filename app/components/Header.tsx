'use client';

import Navigation from './Navigation';
import { auth } from '@/firebase/auth';
import { signOut } from 'firebase/auth';
import { USER_BASE_VALUES } from '../constants/constants';
import { useAtom } from 'jotai';
import { userAtom } from '../store/atoms';

const Header = () => {
  const [user, setUser] = useAtom(userAtom);

  const logOut = async () => {
    await signOut(auth);
    setUser(USER_BASE_VALUES);
  };
  return (
    <header className='flex justify-between h-20'>
      Header
      {user.uid && (
        <>
          <picture>
            <img
              src={user.photoURL}
              alt={user.displayName}
              width={75}
              height={75}
              loading='lazy'
              className=' rounded-full shadow-2xl '
            />
          </picture>
          <button onClick={logOut} className='btn btn-primary'>
            Sign out
          </button>
        </>
      )}
      {user.uid && <Navigation />}
    </header>
  );
};

export default Header;
