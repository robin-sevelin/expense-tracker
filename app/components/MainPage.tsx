'use client';

import { auth } from '@/firebase/auth';
import { signOut } from 'firebase/auth';
import { userAtom } from '../store/atoms';
import { useAtom } from 'jotai';
import { USER_BASE_VALUES } from '../constants/constants';

const MainPage = () => {
  const [user, setUser] = useAtom(userAtom);
  const logOut = async () => {
    await signOut(auth);
    setUser(USER_BASE_VALUES);
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
