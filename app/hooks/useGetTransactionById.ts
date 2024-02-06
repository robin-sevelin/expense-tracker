import { ITransaction } from '@/models/ITransaction';
import { submitAtom, transactionByIdAtom, userAtom } from '@/store/atoms';
import { db } from '@/../firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { useAtom } from 'jotai';
import { useState, useEffect } from 'react';
import { TRANSACTION_BASE_VALUES } from '@/constants/baseValues';
import { TRANSACTIONS, USER_TRANSACTIONS } from '@/constants/constants';

export const useGetTransactionById = (id: string) => {
  const [user] = useAtom(userAtom);
  const [transactionById, setTransactionById] = useAtom(transactionByIdAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useAtom(submitAtom);

  useEffect(() => {
    if (id || isSubmitted) {
      try {
        const getData = async () => {
          const docRef = doc(
            db,
            USER_TRANSACTIONS,
            user.uid,
            TRANSACTIONS,
            user.uid
          );
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();

            const filteredData = data.transactions.filter(
              (transaction: ITransaction) => transaction.id === id
            );
            setTransactionById(filteredData[0]);
          } else {
            setTransactionById(TRANSACTION_BASE_VALUES);
          }

          setIsSubmitted(false);
          setIsLoading(false);
        };

        getData();
      } catch (error) {
        console.error('Error getting transaction by ID:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [user, setTransactionById, isSubmitted, setIsSubmitted, id]);

  console.log(transactionById);

  return { isLoading, transactionById } as const;
};
