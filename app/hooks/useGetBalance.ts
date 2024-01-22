import { db } from '@/firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { balanceAtom, submitAtom, userAtom } from '../store/atoms';

export const useGetBalance = () => {
  const [user] = useAtom(userAtom);
  const [balance, setBalance] = useAtom(balanceAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useAtom(submitAtom);

  useEffect(() => {
    if (isSubmitted || user) {
      const getBalance = async () => {
        try {
          const docRef = doc(db, 'users', user.uid, 'balance', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const docData = docSnap.data();
            const balanceData = docData.balance;
            setBalance(balanceData);
            setIsSubmitted(false);
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
  }, [setBalance, user, setIsSubmitted, isSubmitted]);

  return { isLoading, balance };
};
