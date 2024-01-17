import { db } from '@/firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { submitAtom, transactionsAtom, userAtom } from '../store/atoms';
import { CURRENT_MONTH, CURRENT_YEAR } from '../constants/constants';
import { date } from 'zod';

export const useGetTransactions = () => {
  const [isSubmitted, setIsSubmitted] = useAtom(submitAtom);
  const [user] = useAtom(userAtom);
  const [transactions, setTransactions] = useAtom(transactionsAtom);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isSubmitted || user) {
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
          setIsSubmitted(false);
        };
        getData();
      } catch (error) {
        console.error('Error getting transaction list:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [user, setTransactions, setIsSubmitted, isSubmitted]);

  return { isLoading, transactions } as const;
};
