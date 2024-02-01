import { CURRENT_DATE } from '@/constants/constants';
import { IUser } from '@/models/IUser';
import { doc, getDoc, setDoc, updateDoc, collection } from '../firestore';
import { db } from '../firestore';
import { IBalance } from '@/models/BudgetValues';

export const createBalanceDocument = async (
  userAuth: IUser,
  balance: IBalance
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
        amount: balance.amount,
      });
    } catch (error) {
      console.log('Error setting the balance', error);
    }
  } else {
    try {
      await updateDoc(balanceDocRef, {
        amount: balance.amount,
        user: userAuth.displayName,
        createdAt: CURRENT_DATE.toString(),
      });
    } catch (error) {
      console.log('Error updating the balance', error);
    }
  }

  return { amount: balance } as const;
};
