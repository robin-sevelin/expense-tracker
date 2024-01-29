import { IUser } from '@/app/models/IUser';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firestore';
import { IReccuringIncome } from '@/app/models/BudgetValues';

export const deleteReccuringIncome = async (userAuth: IUser, id: string) => {
  const transactionCollectionRef = doc(
    db,
    'users',
    userAuth?.uid,
    'reccuringIncomes',
    userAuth?.uid
  );

  try {
    const transactionDocSnapshot = await getDoc(transactionCollectionRef);
    const existingData = transactionDocSnapshot.data();

    if (existingData) {
      const updatedTransactions = existingData.incomes.filter(
        (income: IReccuringIncome) => income.id !== id
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
