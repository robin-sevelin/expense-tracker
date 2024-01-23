import { db } from '@/firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { submitAtom, transactionsAtom, userAtom } from '../store/atoms';

export const useGetTransactions = () => {
  const [isSubmitted, setIsSubmitted] = useAtom(submitAtom);
  const [user] = useAtom(userAtom);
  const [transactions, setTransactions] = useAtom(transactionsAtom);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isSubmitted || !transactions.length) {
      try {
        const getData = async () => {
          const docRef = doc(db, 'users', user.uid, 'transactions', user.uid);
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
  }, [user, setTransactions, setIsSubmitted, isSubmitted, transactions]);

  return { isLoading, transactions } as const;
};
