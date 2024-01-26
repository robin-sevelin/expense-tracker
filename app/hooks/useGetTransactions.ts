import { db } from '@/firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { submitAtom, transactionsAtom, userAtom } from '../store/atoms';

export const useGetTransactions = () => {
  const [user] = useAtom(userAtom);
  const [transactions, setTransactions] = useAtom(transactionsAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIssubmited] = useAtom(submitAtom);

  useEffect(() => {
    if (transactions.length === 0 || isSubmitted) {
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
        };
        getData();
      } catch (error) {
        console.error('Error getting transaction list:', error);
      } finally {
        setIsLoading(false);
        setIssubmited(false);
      }
    }
  }, [isSubmitted, setIssubmited, transactions, setTransactions, user.uid]);

  return { isLoading, transactions } as const;
};
