import { IUser } from '@/models/IUser';
import { doc, getDoc, updateDoc } from '../firestore';
import { db } from '../firestore';
import { IRecurringTransaction } from '@/models/IRecurringTransaction';
import {
  RECURRING_TRANSACTIONS,
  USER_TRANSACTIONS,
} from '@/constants/constants';

export const deleteReccuringTransaction = async (
  userAuth: IUser,
  id: string
) => {
  const transactionCollectionRef = doc(
    db,
    USER_TRANSACTIONS,
    userAuth?.uid,
    RECURRING_TRANSACTIONS,
    userAuth?.uid
  );

  try {
    const transactionDocSnapshot = await getDoc(transactionCollectionRef);
    const existingData = transactionDocSnapshot.data();

    if (existingData) {
      const updatedTransactions = existingData.transactions.filter(
        (transaction: IRecurringTransaction) => transaction.id !== id
      );

      await updateDoc(transactionCollectionRef, {
        transactions: updatedTransactions,
      });
    }
  } catch (error) {
    console.log('Error deleting the transaction', error);
  }

  return { transactionCollectionRef } as const;
};
