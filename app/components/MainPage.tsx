'use client';

import { auth } from '@/firebase/auth';
import { signOut } from 'firebase/auth';
import { loggedInAtom, userAtom } from '../store/atoms';
import { useAtom } from 'jotai';

const MainPage = () => {
  const [, setIsloggedIn] = useAtom(loggedInAtom);
  const [user] = useAtom(userAtom);
  const logOut = async () => {
    await signOut(auth);
    setIsloggedIn(false);
  };

  return (
    <div>
      <h2>MainPage</h2>
      Hello {user.displayName}
      <button onClick={logOut} className='btn btn-primary'>
        Sign out
      </button>
    </div>
  );
};

export default MainPage;
