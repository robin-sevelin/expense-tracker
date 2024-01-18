import { db } from '@/firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import {
  selectedMonthAtom,
  submitAtom,
  transactionsAtom,
  userAtom,
} from '../store/atoms';

export const useGetTransactions = () => {
  const [isSubmitted, setIsSubmitted] = useAtom(submitAtom);
  const [user] = useAtom(userAtom);
  const [transactions, setTransactions] = useAtom(transactionsAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMonth] = useAtom(selectedMonthAtom);

  useEffect(() => {
    if (isSubmitted || user) {
      try {
        const getData = async () => {
          const docRef = doc(
            db,
            'transactions',
            user.uid,
            selectedMonth.year.toString(),
            selectedMonth.month
          );
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setTransactions(data?.transactions);
          } else {
            setTransactions([]);
          }

          setIsSubmitted(false);
        };
        getData();
      } catch (error) {
        console.error('Error getting transaction list:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [user, setTransactions, setIsSubmitted, isSubmitted, selectedMonth]);

  return { isLoading, transactions } as const;
};
