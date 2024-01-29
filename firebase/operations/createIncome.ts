import { TRANSACTION_TYPES } from '@/app/constants/constants';
import { IUser } from '@/app/models/IUser';
import { doc, setDoc, collection, arrayUnion } from 'firebase/firestore';
import { db } from '../firestore';
import { v4 as uuidv4 } from 'uuid';
import { IReccuringIncome } from '@/app/models/BudgetValues';

export const createIncomeDocument = async (
  userAuth: IUser,
  income: IReccuringIncome
) => {
  const updatedIncome = {
    ...income,
    id: uuidv4(),
    date: income.date.toString(),
    type: TRANSACTION_TYPES.RECCURING_INCOME,
  };

  const incomeCollectionRef = collection(
    db,
    'users',
    userAuth?.uid,
    'reccuringIncomes'
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
