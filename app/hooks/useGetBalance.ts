import { db } from '@/firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { balanceAtom, userAtom } from '../store/atoms';

export const useGetBalance = () => {
  const [balance, setBalance] = useAtom(balanceAtom);
  const [user] = useAtom(userAtom);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const getBalance = async () => {
        try {
          const docRef = doc(db, 'users balance', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const docData = docSnap.data();
            const balanceData = docData.balance;
            setBalance(balanceData);
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.log('something went wrong', error);
        } finally {
          setIsLoading(false);
        }
      };
      getBalance();
    }
  }, [setBalance, user]);

  return { isLoading, balance };
};
