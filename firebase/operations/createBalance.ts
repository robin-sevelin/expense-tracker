import { DATESTAMP } from '@/app/constants/constants';
import { IUser } from '@/app/models/IUser';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firestore';

export const createBalanceDocument = async (
  userAuth: IUser,
  balance: number
) => {
  const balanceDocRef = doc(db, 'users balance', userAuth?.uid);

  const balanceSnapshot = await getDoc(balanceDocRef);

  if (!balanceSnapshot.exists()) {
    try {
      await setDoc(balanceDocRef, {
        user: userAuth.displayName,
        createdAt: DATESTAMP.toLocaleString(),
        balance: balance,
      });
    } catch (error) {
      console.log('Error setting the balance', error);
    }
  } else {
    try {
      await updateDoc(balanceDocRef, {
        balance: balance,
        user: userAuth.displayName,
        createdAt: DATESTAMP.toLocaleString(),
      });
    } catch (error) {
      console.log('Error updating the balance', error);
    }
  }

  return { amount: balance } as const;
};
