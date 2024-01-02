'use client';

import { loggedInAtom, userAtom } from '../store/atoms';
import { useAtom } from 'jotai';
import { logOut } from '../services/signOutService';
import { USER_BASE_VALUES } from '../constants/constants';

const MainPage = () => {
  const [, setIsLoggedIn] = useAtom(loggedInAtom);
  const [user, setUser] = useAtom(userAtom);

  const handleClick = async () => {
    await logOut();
    setIsLoggedIn(false);
    setUser(USER_BASE_VALUES);
  };

  return (
    <div>
      MainPage
      {user?.displayName}
      <button className='btn btn-secondary' onClick={handleClick}>
        Sign out
      </button>
      <picture>
        <img
          src={user?.photoURL}
          height={50}
          width={50}
          alt={user?.displayName}
          className=' rounded-full'
        />
      </picture>
    </div>
  );
};

export default MainPage;
