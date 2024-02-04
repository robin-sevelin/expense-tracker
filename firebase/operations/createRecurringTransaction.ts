import { IUser } from '@/models/IUser';
import { doc, setDoc, collection, arrayUnion } from '../firestore';
import { db } from '../firestore';
import { v4 as uuidv4 } from 'uuid';
import { IRecurringTransaction } from '@/models/IRecurringTransaction';

export const createRecurringTransactionDocument = async (
  userAuth: IUser,
  expense: IRecurringTransaction
) => {
  const updatedExpense = {
    ...expense,
    id: uuidv4(),
    date: expense.date.toString(),
  };

  const expenseCollectionRef = collection(
    db,
    'userTransactions',
    userAuth?.uid,
    'recurringTransactions'
  );

  const expenseDocRef = doc(expenseCollectionRef, userAuth.uid);

  try {
    await setDoc(
      expenseDocRef,
      {
        transactions: arrayUnion(updatedExpense),
      },
      { merge: true }
    );
  } catch (error) {
    console.log('Error updating the expense', error);
  }

  return { expenseDocRef } as const;
};
