import { ITransaction } from '@/app/models/ITransaction';
import {
  selectedMonthAtom,
  submitAtom,
  transactionByIdAtom,
  userAtom,
} from './../store/atoms';
import { db } from '@/firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { useAtom } from 'jotai';
import { useState, useEffect } from 'react';
import { TRANSACTION_BASE_VALUES } from '../constants/constants';

export const useGetTransactionById = (id: string) => {
  const [user] = useAtom(userAtom);
  const [transaction, setTransaction] = useAtom(transactionByIdAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useAtom(submitAtom);
  const [selectedPeriod] = useAtom(selectedMonthAtom);

  useEffect(() => {
    if (id) {
      try {
        const getData = async () => {
          const docRef = doc(
            db,
            'transactions',
            user.uid,
            selectedPeriod.year.toString(),
            selectedPeriod.month
          );
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data) console.log(data);
            setTransaction(data as ITransaction);
          } else {
            setTransaction(TRANSACTION_BASE_VALUES);
          }
          const data = docSnap.data();

          setTransaction(data?.transactions[0] as ITransaction);
          setIsSubmitted(false);
        };
        getData();
      } catch (error) {
        console.error('Error getting transaction by ID:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [user, setTransaction, isSubmitted, setIsSubmitted, id, selectedPeriod]);

  return { isLoading, transaction } as const;
};
