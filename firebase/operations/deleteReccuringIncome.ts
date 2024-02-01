import { IUser } from '@/models/IUser';
import { doc, getDoc, updateDoc } from '../firestore';
import { db } from '../firestore';
import { IRecurringIncome } from '@/models/BudgetValues';

export const deleteReccuringIncome = async (userAuth: IUser, id: string) => {
  const transactionCollectionRef = doc(
    db,
    'users',
    userAuth?.uid,
    'recurringIncomes',
    userAuth?.uid
  );

  try {
    const transactionDocSnapshot = await getDoc(transactionCollectionRef);
    const existingData = transactionDocSnapshot.data();

    if (existingData) {
      const updatedTransactions = existingData.incomes.filter(
        (income: IRecurringIncome) => income.id !== id
      );

      await updateDoc(transactionCollectionRef, {
        incomes: updatedTransactions,
      });
    }
  } catch (error) {
    console.log('Error deleting the transaction', error);
  }

  return { transactionCollectionRef } as const;
};
