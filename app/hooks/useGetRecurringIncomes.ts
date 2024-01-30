import { db } from '@/firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { reccuringIncomeAtom, submitAtom, userAtom } from '../store/atoms';
import { IRecurringIncome } from '../models/BudgetValues';

export const useGetRecurringIncomes = () => {
  const [user] = useAtom(userAtom);
  const [recurringIncomes, setRecurringIncomes] = useAtom(reccuringIncomeAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useAtom(submitAtom);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    if (isSubmitted || !dataFetched || recurringIncomes.length === 0) {
      console.log('hämtar rec inc');

      const getIncome = async () => {
        try {
          const docRef = doc(
            db,
            'users',
            user.uid,
            'recurringIncomes',
            user.uid
          );
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            const incomeData = data.incomes;
            setRecurringIncomes(incomeData as IRecurringIncome[]);
          } else {
            // console.log('No such document for recurring incomes!');
          }
        } catch (error) {
          console.error('Error fetching recurring incomes:', error);
        } finally {
          setIsLoading(false);
          setIsSubmitted(false);
          setDataFetched(true);
        }
      };
      getIncome();
    }
  }, [
    setRecurringIncomes,
    user,
    setIsSubmitted,
    isSubmitted,
    dataFetched,
    recurringIncomes.length,
  ]);

  return { isLoading, recurringIncomes };
};
