import { useEffect, useState } from 'react';
import { db } from '@/firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { auth } from '@/firebase/auth';
import { USER_BASE_VALUES } from '../constants/constants';
import { IUser } from '../models/IUser';

export const useGetUser = () => {
  const [, setUser] = useState(USER_BASE_VALUES);

  useEffect(() => {
    const getData = async () => {
      const currentUser = auth.currentUser;

      if (currentUser) {
        const docRef = doc(db, 'users', currentUser.uid);

        try {
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUser(docSnap.data() as IUser);
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error getting document:', error);
        }
      } else {
        console.log('No authenticated user!');
      }
    };
    getData();
  }, [setUser]);
};
