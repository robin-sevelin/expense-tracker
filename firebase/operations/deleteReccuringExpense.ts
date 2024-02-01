import { IUser } from '@/models/IUser';
import { doc, getDoc, updateDoc } from '../firestore';
import { db } from '../firestore';
import { IRecurringExpense } from '@/models/BudgetValues';

export const deleteReccuringExpense = async (userAuth: IUser, id: string) => {
  const transactionCollectionRef = doc(
    db,
    'users',
    userAuth?.uid,
    'recurringExpenses',
    userAuth?.uid
  );

  try {
    const transactionDocSnapshot = await getDoc(transactionCollectionRef);
    const existingData = transactionDocSnapshot.data();

    if (existingData) {
      const updatedTransactions = existingData.expenses.filter(
        (expense: IRecurringExpense) => expense.id !== id
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
