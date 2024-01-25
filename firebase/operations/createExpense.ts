import { CURRENT_DATE } from '@/app/constants/constants';
import { IUser } from '@/app/models/IUser';
import { doc, setDoc, collection, arrayUnion } from 'firebase/firestore';
import { db } from '../firestore';
import { ExpenseFormData } from '@/app/models/FormData';
import { v4 as uuidv4 } from 'uuid';

export const createExpenseDocument = async (
  userAuth: IUser,
  expense: ExpenseFormData
) => {
  const updatedExpense = {
    ...expense,
    date: CURRENT_DATE.toString(),
    id: uuidv4(),
  };

  const expenseCollectionRef = collection(
    db,
    'users',
    userAuth?.uid,
    'reccuringExpenses'
  );

  const expenseDocRef = doc(expenseCollectionRef, userAuth.uid);

  try {
    await setDoc(
      expenseDocRef,
      {
        expenses: arrayUnion(updatedExpense),
      },
      { merge: true }
    );
  } catch (error) {
    console.log('Error updating the expense', error);
  }

  return { expenseDocRef } as const;
};
