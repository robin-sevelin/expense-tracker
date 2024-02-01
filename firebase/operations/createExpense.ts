import { IUser } from '@/models/IUser';
import { doc, setDoc, collection, arrayUnion } from '../firestore';
import { db } from '../firestore';
import { v4 as uuidv4 } from 'uuid';
import { TRANSACTION_TYPES } from '@/constants/constants';
import { IRecurringExpense } from '@/models/BudgetValues';

export const createExpenseDocument = async (
  userAuth: IUser,
  expense: IRecurringExpense
) => {
  const updatedExpense = {
    ...expense,
    id: uuidv4(),
    date: expense.date.toString(),
    type: TRANSACTION_TYPES.RECURRING_EXPENSE,
  };

  const expenseCollectionRef = collection(
    db,
    'users',
    userAuth?.uid,
    'recurringExpenses'
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
