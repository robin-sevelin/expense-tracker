import { IUser } from '@/app/models/IUser';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firestore';
import { ITransaction } from '@/app/models/ITransaction';
import { DateTime } from 'luxon';

export const createPeriodDocument = async (
  userAuth: IUser,
  transaction: ITransaction
) => {
  const formatDate = DateTime.fromJSDate(transaction.date as Date);
  const formatYear = formatDate.year;
  const formatMonth = formatDate.toFormat('MMMM');
  const periodsDocRef = doc(db, 'periods', userAuth?.uid);

  try {
    const periodsDocSnapshot = await getDoc(periodsDocRef);
    const existingData = periodsDocSnapshot.data();

    if (!periodsDocSnapshot.exists()) {
      await setDoc(periodsDocRef, {
        years: [formatYear],
        months: [
          {
            month: formatMonth,
            year: formatYear,
          },
        ],
      });
    } else {
      const updatedYears = arrayUnion(
        ...(existingData?.years || []),
        transaction.date?.getFullYear()
      );

      const updatedMonths = arrayUnion(...(existingData?.months || []), {
        year: formatYear,
        month: formatMonth,
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
