import { IPeriod } from './../models/IPeriod';
import { useEffect, useState } from 'react';
import { userAtom } from '../store/atoms';
import { db } from '@/firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { useAtom } from 'jotai';

export const useGetPeriods = () => {
  const [user] = useAtom(userAtom);
  const [periods, setPeriods] = useState<IPeriod>();

  useEffect(() => {
    const getAvailableYears = async () => {
      const docRef = doc(db, 'periods', user.uid);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        setPeriods(data as IPeriod);
        console.log(data);
      } else {
        console.log('Document does not exist');
      }
    };

    getAvailableYears();
  }, [user.uid]);

  return { periods } as const;
};
