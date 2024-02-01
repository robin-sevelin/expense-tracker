import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { auth } from '@/../firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { IUser } from '@/models/IUser';
import { userAtom } from '@/store/atoms';

export const useIsLoggedIn = () => {
  const [user, setUser] = useAtom(userAtom);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    if (!dataFetched) {
      onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          setUser(currentUser as IUser);
          setDataFetched(true);
        }
      });
    }
  }, [dataFetched, setDataFetched, setUser]);

  return { user } as const;
};
