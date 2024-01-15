'use client';

import AddTransaction from '@/app/components/AddTransaction';
import { IUser } from '@/app/models/IUser';
import { TransactionFormData } from '@/app/models/TransactionFormData';
import { userAtom } from '@/app/store/atoms';
import { createTransactionDocument } from '@/firebase/firestore';
import { useAtom } from 'jotai';

const AddTransactions = () => {
  const [user] = useAtom(userAtom);
  const submitData = async (user: IUser, data: TransactionFormData) => {
    await createTransactionDocument(user, data);
  };
  return (
    <>
      <AddTransaction onHandleSubmit={submitData} user={user} />
    </>
  );
};

export default AddTransactions;
