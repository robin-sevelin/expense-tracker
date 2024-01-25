import { db } from '@/firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { incomeAtom, submitAtom, userAtom } from '../store/atoms';

export const useGetIncomes = () => {
  const [user] = useAtom(userAtom);
  const [income, setIncome] = useAtom(incomeAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useAtom(submitAtom);

  useEffect(() => {
    if (isSubmitted || !income) {
      const getIncome = async () => {
        try {
          const docRef = doc(db, 'users', user.uid, 'incomeSum', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const docData = docSnap.data();
            const incomeData = docData.amount;
            setIncome(incomeData);
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
  }, [setIncome, user, setIsSubmitted, isSubmitted, income]);

  return { isLoading, income };
};
