import { db } from '../../firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { reccuringExpenseAtom, submitAtom, userAtom } from '../store/atoms';
import { IRecurringExpense } from '../models/BudgetValues';

export const useGetRecurringExpenses = () => {
  const [user] = useAtom(userAtom);
  const [recurringExpenses, setExpenses] = useAtom(reccuringExpenseAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useAtom(submitAtom);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    if (isSubmitted || !dataFetched || recurringExpenses.length === 0) {
      const getExpense = async () => {
        try {
          const docRef = doc(
            db,
            'users',
            user.uid,
            'recurringExpenses',
            user.uid
          );
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const docData = docSnap.data();
            const expenseData = docData.expenses;

            setExpenses(expenseData as IRecurringExpense[]);
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
    setExpenses,
    user,
    setIsSubmitted,
    isSubmitted,
    recurringExpenses.length,
    dataFetched,
  ]);

  return { isLoading, recurringExpenses };
};
