import { IUser } from '@/app/models/IUser';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firestore';
import { ITransaction } from '@/app/models/ITransaction';

export const createPeriodDocument = async (
  userAuth: IUser,
  transaction: ITransaction
) => {
  const periodsDocRef = doc(db, 'periods', userAuth?.uid);

  try {
    const periodsDocSnapshot = await getDoc(periodsDocRef);
    const existingData = periodsDocSnapshot.data();

    if (!periodsDocSnapshot.exists()) {
      await setDoc(periodsDocRef, {
        years: [transaction.date?.getFullYear()],
        months: [
          {
            month: transaction.date?.toLocaleString('en-US', { month: 'long' }),
            year: transaction.date?.getFullYear().toString(),
          },
        ],
      });
    } else {
      const updatedYears = arrayUnion(
        ...(existingData?.years || []),
        transaction.date?.getFullYear()
      );

      const updatedMonths = arrayUnion(...(existingData?.months || []), {
        year: transaction.date?.getFullYear().toString(),
        month: transaction.date?.toLocaleString('en-US', { month: 'long' }),
      });

      await updateDoc(periodsDocRef, {
        years: updatedYears,
        months: updatedMonths,
      });
    }
  } catch (error) {
    console.log('Error updating the periods document', error);
  }
};
