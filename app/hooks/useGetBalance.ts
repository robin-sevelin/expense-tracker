import { db } from '@/firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { balanceAtom, userAtom } from '../store/atoms';

export const useGetBalance = () => {
  const [user] = useAtom(userAtom);
  const [, setBalance] = useAtom(balanceAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBalance = async () => {
      try {
        const docRef = doc(db, 'transactions', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const docData = docSnap.data();
          const balance = docData.balance;
          setBalance(balance);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.log('something went wrong', error);
      } finally {
        setLoading(false);
      }
    };
    getBalance();
  }, [setBalance, user]);

  return { loading };
};
