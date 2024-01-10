import { db } from '@/firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { ITransaction } from '../models/ITransaction';
import { useAtom } from 'jotai';
import { userAtom } from '../store/atoms';

export const useGetTransactions = () => {
  const [user] = useAtom(userAtom);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!transactions.length) {
      try {
        const getData = async () => {
          const docRef = doc(db, 'transactions', user.uid);
          const docSnap = await getDoc(docRef);
          const data = docSnap.data();

          setTransactions(data?.transactions);
        };
        getData();
      } catch (error) {
        console.error('Error gettoíng transaction list:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [transactions, user]);

  return { isLoading, transactions } as const;
};
