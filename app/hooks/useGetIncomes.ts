import { db } from '@/firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { incomeAtom, submitAtom, userAtom } from '../store/atoms';
import { IIncome } from '../models/IIncome';

export const useGetIncomes = () => {
  const [user] = useAtom(userAtom);
  const [incomes, setIncomes] = useAtom(incomeAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useAtom(submitAtom);

  useEffect(() => {
    if (isSubmitted || !incomes.length) {
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
            setIncomes(incomeData as IIncome[]);
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
  }, [setIncomes, user, setIsSubmitted, isSubmitted, incomes]);

  return { isLoading, incomes };
};
