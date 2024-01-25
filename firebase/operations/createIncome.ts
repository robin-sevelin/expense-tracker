import { CURRENT_DATE } from '@/app/constants/constants';
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
    date: CURRENT_DATE.toString(),
    id: uuidv4(),
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
