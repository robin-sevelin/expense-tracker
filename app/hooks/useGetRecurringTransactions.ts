import { db } from '@/../firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { IRecurringTransaction } from '@/models/IRecurringTransaction';
import { recurringTransactionAtom, submitAtom, userAtom } from '@/store/atoms';

export const useGetRecurringTransactions = () => {
  const [user] = useAtom(userAtom);
  const [recurringTransactions, setRecurringTransactions] = useAtom(
    recurringTransactionAtom
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useAtom(submitAtom);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    if (isSubmitted || !dataFetched || recurringTransactions.length === 0) {
      const getExpense = async () => {
        try {
          const docRef = doc(
            db,
            'userTransactions',
            user.uid,
            'recurringTransactions',
            user.uid
          );
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const docData = docSnap.data();
            const expenseData = docData.transactions;

            setRecurringTransactions(expenseData as IRecurringTransaction[]);
          } else {
            // console.log('No such document for recurring expenses!');
          }
        } catch (error) {
          console.error('Error fetching recurring expenses:', error);
        } finally {
          setIsLoading(false);
          setIsSubmitted(false);
          setDataFetched(true);
        }
      };
      getExpense();
    }
  }, [
    setRecurringTransactions,
    user,
    setIsSubmitted,
    isSubmitted,
    recurringTransactions.length,
    dataFetched,
  ]);

  console.log(recurringTransactions);

  return { isLoading, recurringTransactions };
};
