import { db } from '@/firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { expenseAtom, submitAtom, userAtom } from '../store/atoms';

export const useGetExpenses = () => {
  const [user] = useAtom(userAtom);
  const [expense, setExpense] = useAtom(expenseAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useAtom(submitAtom);

  useEffect(() => {
    if (isSubmitted || !expense) {
      const getExpense = async () => {
        try {
          const docRef = doc(db, 'users', user.uid, 'expenseSum', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const docData = docSnap.data();
            const expenseData = docData.amount;
            setExpense(expenseData);
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
  }, [setExpense, user, setIsSubmitted, isSubmitted, expense]);

  return { isLoading, expense };
};
