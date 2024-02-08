import { db } from '../../firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { balanceAtom, submitAtom, userAtom } from '../store/atoms';

export const useGetBalance = () => {
  const [user] = useAtom(userAtom);
  const [balance, setBalance] = useAtom(balanceAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useAtom(submitAtom);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    if (isSubmitted || !balance || !dataFetched) {
      const getBalance = async () => {
        try {
          const docRef = doc(db, 'userBudgets', user.uid, 'balance', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const docData = docSnap.data();
            const balanceData = docData.amount;
            setBalance(balanceData);
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.log('something went wrong', error);
        } finally {
          setIsLoading(false);
          setIsSubmitted(false);
          setDataFetched(true);
        }
      };
      getBalance();
    }
  }, [balance, dataFetched, isSubmitted, setBalance, setIsSubmitted, user.uid]);

  return { isLoading, balance };
};
