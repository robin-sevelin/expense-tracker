import { db } from '@/firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { ITransaction } from '../models/ITransaction';
import { IUser } from '../models/IUser';

export const useGetTransactions = (user: IUser) => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  useEffect(() => {
    if (!transactions.length) {
      const getData = async () => {
        const docRef = doc(db, 'transactions', user.uid);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();

        setTransactions(data?.transactions);
      };

      getData();
    }
  }, [transactions, user]);

  return { transactions } as const;
};
