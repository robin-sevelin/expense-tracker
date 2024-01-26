import { db } from '@/firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { expenseAtom, submitAtom, userAtom } from '../store/atoms';
import { IExpense } from '../models/IExpense';

export const useGetExpenses = () => {
  const [user] = useAtom(userAtom);
  const [expenses, setExpenses] = useAtom(expenseAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useAtom(submitAtom);

  useEffect(() => {
    if (isSubmitted || !expenses.length) {
      const getExpense = async () => {
        try {
          const docRef = doc(
            db,
            'users',
            user.uid,
            'reccuringExpenses',
            user.uid
          );
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const docData = docSnap.data();
            const expenseData = docData.expenses;

            setExpenses(expenseData as IExpense[]);
            setIsSubmitted(false);
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.log('something went wrong', error);
        } finally {
          setIsLoading(false);
        }
      };
      getExpense();
    }
  }, [setExpenses, user, setIsSubmitted, isSubmitted, expenses]);

  return { isLoading, expenses };
};
