import { ITransaction } from '@/app/models/ITransaction';
import { IUser } from '@/app/models/IUser';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firestore';
import { DateTime } from 'luxon';
import { TransactionFormData } from '@/app/models/FormData';

export const updateTransaction = async (
  user: IUser,
  updatedTransaction: TransactionFormData,
  id: string,
  date: Date
) => {
  const transactionCollectionRef = doc(
    db,
    'users',
    user.uid,
    'transactions',
    user.uid
  );

  console.log(updatedTransaction);

  const formatDate = DateTime.fromJSDate(date);

  try {
    const docSnap = await getDoc(transactionCollectionRef);
    if (docSnap.exists()) {
      const data = docSnap.data();

      const transactionArray = data.transactions;

      const updatedArray = transactionArray.map((transaction: ITransaction) => {
        if (transaction.id === id) {
          return {
            ...transaction,
            title: updatedTransaction.title,
            amount: updatedTransaction.amount,
            category: updatedTransaction.category,
            type: updatedTransaction.type,
            id: id,
            date: formatDate.toString(),
          };
        }
        return transaction;
      });

      await updateDoc(transactionCollectionRef, { transactions: updatedArray });
    } else {
      console.log('document doesnt exist');
    }
  } catch (error) {
    console.log('error getting the document', error);
  }
};
