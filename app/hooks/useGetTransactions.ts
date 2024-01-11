import { db } from '@/firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { ITransaction } from '../models/ITransaction';
import { useAtom } from 'jotai';
import { userAtom } from '../store/atoms';
import { CURRENT_MONTH, CURRENT_YEAR } from '../constants/constants';

export const useGetTransactions = (isDeleted: boolean) => {
  const [user] = useAtom(userAtom);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isDeleted || user) {
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
        };
        getData();
      } catch (error) {
        console.error('Error getting transaction list:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [isDeleted, user]);

  return { isLoading, transactions } as const;
};
