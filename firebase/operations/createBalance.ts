import { CURRENT_DATE } from '@/app/constants/constants';
import { IUser } from '@/app/models/IUser';
import { doc, getDoc, setDoc, updateDoc, collection } from 'firebase/firestore';
import { db } from '../firestore';
import { v4 as uuidv4 } from 'uuid';

export const createBalanceDocument = async (
  userAuth: IUser,
  balance: number
) => {
  const balancesCollectionRef = collection(
    db,
    'users',
    userAuth?.uid,
    'balance'
  );

  const balanceDocRef = doc(balancesCollectionRef, userAuth?.uid);

  const balanceSnapshot = await getDoc(balanceDocRef);

  if (!balanceSnapshot.exists()) {
    try {
      await setDoc(balanceDocRef, {
        user: userAuth.displayName,
        createdAt: CURRENT_DATE.toString(),
        balance: balance,
        id: uuidv4(),
      });
    } catch (error) {
      console.log('Error setting the balance', error);
    }
  } else {
    try {
      await updateDoc(balanceDocRef, {
        balance: balance,
        user: userAuth.displayName,
        createdAt: CURRENT_DATE.toString(),
        id: uuidv4(),
      });
    } catch (error) {
      console.log('Error updating the balance', error);
    }
  }

  return { amount: balance } as const;
};
