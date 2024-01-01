import React from 'react';
import { loggedInAtom, userAtom } from '../store/atoms';
import { useAtom } from 'jotai';
import { logOut } from '../services/signOutService';

const MainPage = () => {
  const [, setIsLoggedIn] = useAtom(loggedInAtom);
  const [user] = useAtom(userAtom);

  const handleClick = async () => {
    await logOut();
    setIsLoggedIn(false);
  };
  return (
    <div>
      MainPage
      {user.displayName}
      <button className='btn btn-secondary' onClick={handleClick}>
        Sign out
      </button>
    </div>
  );
};

export default MainPage;
