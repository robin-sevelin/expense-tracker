import { CURRENT_DATE, TRANSACTION_TYPES } from '@/app/constants/constants';
import { IUser } from '@/app/models/IUser';
import { doc, setDoc, collection, arrayUnion } from 'firebase/firestore';
import { db } from '../firestore';
import { IncomeFormData } from '@/app/models/FormData';
import { v4 as uuidv4 } from 'uuid';

export const createIncomeDocument = async (
  userAuth: IUser,
  income: IncomeFormData
) => {
  const updatedIncome = {
    ...income,
    id: uuidv4(),
    date: income.date.toLowerCase(),
    type: TRANSACTION_TYPES.EXPENSE,
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
