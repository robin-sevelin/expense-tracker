import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { auth } from '@/firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { IUser } from '../models/IUser';
import { userAtom } from '../store/atoms';

export const useIsLoggedIn = () => {
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser as IUser);
    });

    return unsubscribe();
  });

  return { user } as const;
};
