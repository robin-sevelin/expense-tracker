import { TRANSACTION_TYPES } from '@/constants/constants';
import { IUser } from '@/models/IUser';
import { doc, setDoc, collection, arrayUnion } from '../firestore';
import { db } from '../firestore';
import { v4 as uuidv4 } from 'uuid';
import { IRecurringIncome } from '@/models/BudgetValues';

export const createIncomeDocument = async (
  userAuth: IUser,
  income: IRecurringIncome
) => {
  const updatedIncome = {
    ...income,
    id: uuidv4(),
    date: income.date.toString(),
    type: TRANSACTION_TYPES.RECURRING_INCOME,
  };

  const incomeCollectionRef = collection(
    db,
    'users',
    userAuth?.uid,
    'recurringIncomes'
  );

  const incomeDocRef = doc(incomeCollectionRef, userAuth.uid);

  try {
    await setDoc(
      incomeDocRef,
      {
        incomes: arrayUnion(updatedIncome),
      },
      { merge: true }
    );
  } catch (error) {
    console.log('Error updating the income', error);
  }

  return { incomeDocRef } as const;
};
