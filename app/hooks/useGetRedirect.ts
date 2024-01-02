import { auth } from '@/firebase/auth';
import { createUserDocument } from '@/firebase/firestore';
import { getRedirectResult } from 'firebase/auth';
import { useEffect } from 'react';
import { IUser } from '../models/IUser';
import { useAtom } from 'jotai';
import { loggedInAtom, userAtom } from '../store/atoms';

export const useGetRedirect = () => {
  const [, setUser] = useAtom(userAtom);
  const [, setIsloggedIn] = useAtom(loggedInAtom);
  useEffect(() => {
    const getData = async () => {
      const response = await getRedirectResult(auth);
      if (response) {
        setUser(response.user as IUser);
        setIsloggedIn(true);
        await createUserDocument(response.user as IUser);
      }
    };
    getData();
  }, [setUser, setIsloggedIn]);
};
