'use client';

import AddTransaction from '@/components/formPage/AddTransaction';
import { IUser } from '@/models/IUser';
import { createTransactionDocument } from '@/../firebase/operations/createTransaction';
import { useGetTransactions } from '@/hooks/useGetTransactions';
import { useAtom } from 'jotai';
import { submitAtom } from '@/store/atoms';
import { ITransaction } from '@/models/ITransaction';
import { useAuthUser } from '@/hooks/useAuthUser';
import Loading from '@/components/sharedComponents/Loading';

const AddTransactions = () => {
  const [, setIsSubmitted] = useAtom(submitAtom);
  const { isLoading } = useGetTransactions();
  useAuthUser();

  const submitData = async (user: IUser, data: ITransaction, date: Date) => {
    await createTransactionDocument(user, data, date);
    setIsSubmitted(true);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <AddTransaction onHandleSubmit={submitData} />
    </>
  );
};

export default AddTransactions;
