import { IUser } from '@/app/models/IUser';
import { doc, setDoc, collection, arrayUnion } from 'firebase/firestore';
import { db } from '../firestore';
import { v4 as uuidv4 } from 'uuid';
import { TRANSACTION_TYPES } from '@/app/constants/constants';
import { IReccuringExpense } from '@/app/models/BudgetValues';

export const createExpenseDocument = async (
  userAuth: IUser,
  expense: IReccuringExpense
) => {
  const updatedExpense = {
    ...expense,
    id: uuidv4(),
    date: expense.date.toString(),
    type: TRANSACTION_TYPES.EXPENSE,
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
