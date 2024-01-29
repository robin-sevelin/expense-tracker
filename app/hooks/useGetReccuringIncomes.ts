import { db } from '@/firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { reccuringIncomeAtom, submitAtom, userAtom } from '../store/atoms';
import { IReccuringIncome } from '../models/BudgetValues';

export const useGetReccuringIncomes = () => {
  const [user] = useAtom(userAtom);
  const [reccuringIncomes, setReccuringIncomes] = useAtom(reccuringIncomeAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useAtom(submitAtom);

  useEffect(() => {
    if (isSubmitted || !reccuringIncomes.length) {
      const getIncome = async () => {
        try {
          const docRef = doc(
            db,
            'users',
            user.uid,
            'reccuringIncomes',
            user.uid
          );
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const docData = docSnap.data();
            const incomeData = docData.incomes;
            setReccuringIncomes(incomeData as IReccuringIncome[]);
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
      getIncome();
    }
  }, [
    setReccuringIncomes,
    user,
    setIsSubmitted,
    isSubmitted,
    reccuringIncomes,
  ]);

  return { isLoading, reccuringIncomes };
};
