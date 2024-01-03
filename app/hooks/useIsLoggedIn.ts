import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { auth } from '@/firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { IUser } from '../models/IUser';
import { userAtom } from '../store/atoms';

export const useIsLoggedIn = () => {
  const [, setUser] = useAtom(userAtom);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser as IUser);
      }
    });
  });
};
