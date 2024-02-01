import { ITransaction } from '@/app/models/ITransaction';
import { submitAtom, transactionByIdAtom, userAtom } from './../store/atoms';
import { db } from '../../firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { useAtom } from 'jotai';
import { useState, useEffect } from 'react';
import { TRANSACTION_BASE_VALUES } from '../constants/constants';

export const useGetTransactionById = (id: string) => {
  const [user] = useAtom(userAtom);
  const [transaction, setTransaction] = useAtom(transactionByIdAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useAtom(submitAtom);

  useEffect(() => {
    if (id || isSubmitted) {
      try {
        const getData = async () => {
          const docRef = doc(db, 'users', user.uid, 'transactions', user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();

            const filteredData = data.transactions.filter(
              (transaction: ITransaction) => transaction.id === id
            );

            setTransaction(filteredData[0]);
          } else {
            setTransaction(TRANSACTION_BASE_VALUES);
          }

          setIsSubmitted(false);
        };

        getData();
      } catch (error) {
        console.error('Error getting transaction by ID:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [user, setTransaction, isSubmitted, setIsSubmitted, id]);

  return { isLoading, transaction } as const;
};
