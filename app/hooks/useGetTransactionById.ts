import { idAtom, userAtom } from './../store/atoms';
import { db } from '@/firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { useAtom } from 'jotai';
import { useState, useEffect } from 'react';
import { CURRENT_YEAR, CURRENT_MONTH } from '../constants/constants';
import { submitAtom, transactionAtom } from '../store/atoms';
import { ITransaction } from '../models/ITransaction';

export const useGetTransactionById = (id: string) => {
  const [user] = useAtom(userAtom);
  const [, setTransaction] = useAtom(transactionAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useAtom(submitAtom);

  useEffect(() => {
    if (id || isSubmitted) {
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

          const selectedTransaction = data?.transactions.find(
            (transaction: ITransaction) => transaction.id === id
          );

          setTransaction(selectedTransaction);
          setIsSubmitted(false);
        };
        getData();
      } catch (error) {
        console.error('Error getting transaction by ID:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [user, setTransaction, isSubmitted, id, setIsSubmitted]);

  return { isLoading } as const;
};
