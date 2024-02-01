import { ITransaction } from '@/models/ITransaction';
import { IUser } from '@/models/IUser';
import { doc, getDoc, updateDoc } from '../firestore';
import { db } from '../firestore';

export const updateTransaction = async (
  user: IUser,
  updatedTransaction: ITransaction,
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
            date: date.toString(),
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
