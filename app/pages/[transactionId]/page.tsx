'use client';

import AddTransaction from '@/components/formPage/AddTransaction';
import TransactionById from '@/components/transactionPage/TransactionById';
import { useGetTransactionById } from '@/hooks/useGetTransactionById';
import { IUser } from '@/models/IUser';
import React from 'react';
import { submitAtom } from '@/store/atoms';
import { useAtom } from 'jotai';
import { updateTransaction } from '../../../firebase/operations/updateTransaction';
import { useGetTransactions } from '@/hooks/useGetTransactions';
import { ITransaction } from '@/models/ITransaction';

const EditTransaction = ({ params }: { params: { transactionId: string } }) => {
  const id = params.transactionId;
  const [, setIsSubmitted] = useAtom(submitAtom);
  const { transaction } = useGetTransactionById(id);
  useGetTransactions();

  const submitData = async (user: IUser, data: ITransaction, date: Date) => {
    await updateTransaction(user, data, id, date);

    setIsSubmitted(true);
  };

  return (
    <>
      <AddTransaction onHandleSubmit={submitData} />
      <TransactionById transaction={transaction} />
    </>
  );
};

export default EditTransaction;
