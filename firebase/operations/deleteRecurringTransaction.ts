import { IUser } from '@/models/IUser';
import { doc, getDoc, updateDoc } from '../firestore';
import { db } from '../firestore';
import { IRecurringTransaction } from '@/models/IRecurringTransaction';

export const deleteReccuringTransaction = async (
  userAuth: IUser,
  id: string
) => {
  const transactionCollectionRef = doc(
    db,
    'userTransactions',
    userAuth?.uid,
    'recurringTransactions',
    userAuth?.uid
  );

  try {
    const transactionDocSnapshot = await getDoc(transactionCollectionRef);
    const existingData = transactionDocSnapshot.data();

    if (existingData) {
      const updatedTransactions = existingData.expenses.filter(
        (expense: IRecurringTransaction) => expense.id !== id
      );

      await updateDoc(transactionCollectionRef, {
        expenses: updatedTransactions,
      });
    }
  } catch (error) {
    console.log('Error deleting the transaction', error);
  }

  return { transactionCollectionRef } as const;
};
