'use client';

import AddTransaction from '@/app/components/formPage/AddTransaction';
import { IUser } from '@/app/models/IUser';
import { createTransactionDocument } from '@/firebase/operations/createTransaction';
import { useGetTransactions } from '@/app/hooks/useGetTransactions';
import { useAtom } from 'jotai';
import { submitAtom } from '@/app/store/atoms';
import { ITransaction } from '@/app/models/ITransaction';

const AddTransactions = () => {
  const [, setIsSubmitted] = useAtom(submitAtom);
  useGetTransactions();
  const submitData = async (user: IUser, data: ITransaction, date: Date) => {
    await createTransactionDocument(user, data, date);
    setIsSubmitted(true);
  };

  return (
    <>
      <AddTransaction onHandleSubmit={submitData} />
    </>
  );
};

export default AddTransactions;
