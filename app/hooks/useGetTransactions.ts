import { db } from '@/firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { submitAtom, transactionsAtom, userAtom } from '../store/atoms';
import { CURRENT_MONTH, CURRENT_YEAR } from '../constants/constants';

export const useGetTransactions = () => {
  const [user] = useAtom(userAtom);
  const [, setTransactions] = useAtom(transactionsAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleted, setIsDeleted] = useAtom(submitAtom);

  useEffect(() => {
    if (user || isDeleted) {
      try {
        const getData = async () => {
          const docRef = doc(
            db,
            'transactions',
            user.uid,
            CURRENT_YEAR,
            CURRENT_MONTH
          );
          const docSnap = await getDoc(docRef);
          const data = docSnap.data();

          setTransactions(data?.transactions);
          setIsDeleted(false);
        };
        getData();
      } catch (error) {
        console.error('Error getting transaction list:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [user, setTransactions, setIsDeleted, isDeleted]);

  return { isLoading } as const;
};
