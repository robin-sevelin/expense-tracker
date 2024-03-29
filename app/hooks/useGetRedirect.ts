import { auth } from '@/../firebase/auth';
import { getRedirectResult } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '@/store/atoms';
import { IUser } from '@/models/IUser';

export const useGetRedirect = () => {
  const [user, setUser] = useAtom(userAtom);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getRedirectResult(auth);
        if (response) {
          setUser(response.user as IUser);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error during login:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [setUser]);

  return { isLoading, user } as const;
};
