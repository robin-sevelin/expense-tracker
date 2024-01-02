import { auth } from '@/firebase/auth';
import { createUserDocument } from '@/firebase/firestore';
import { getRedirectResult } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { loggedInAtom, userAtom } from '../store/atoms';
import { IUser } from '../models/IUser';

export const useGetRedirect = () => {
  const [, setUser] = useAtom(userAtom);
  const [, setIsloggedIn] = useAtom(loggedInAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getRedirectResult(auth);
        if (response) {
          setUser(response.user as IUser);
          setIsloggedIn(true);
          await createUserDocument(response.user as IUser);
        }
      } catch (error) {
        console.error('Error during login:', error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [setUser, setIsloggedIn]);

  return { loading };
};
