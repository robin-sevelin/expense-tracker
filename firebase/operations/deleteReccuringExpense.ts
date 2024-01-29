import { IUser } from '@/app/models/IUser';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firestore';
import { IReccuringExpense } from '@/app/models/BudgetValues';

export const deleteReccuringExpense = async (userAuth: IUser, id: string) => {
  const transactionCollectionRef = doc(
    db,
    'users',
    userAuth?.uid,
    'reccuringExpenses',
    userAuth?.uid
  );

  try {
    const transactionDocSnapshot = await getDoc(transactionCollectionRef);
    const existingData = transactionDocSnapshot.data();

    if (existingData) {
      const updatedTransactions = existingData.expenses.filter(
        (expense: IReccuringExpense) => expense.id !== id
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
