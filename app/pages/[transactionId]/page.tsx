'use client';

import AddTransaction from '@/app/components/AddTransaction';
import TransactionById from '@/app/components/TransactionById';
import { useGetTransactionById } from '@/app/hooks/useGetTransactionById';
import { IUser } from '@/app/models/IUser';
import { TransactionFormData } from '@/app/models/TransactionFormData';
import { submitAtom, transactionAtom, userAtom } from '@/app/store/atoms';
import { updateTransactionObject } from '@/firebase/firestore';
import { useAtom } from 'jotai/react';
import Link from 'next/link';
import React from 'react';

const EditTransaction = ({ params }: { params: { transactionId: string } }) => {
  const [transaction] = useAtom(transactionAtom);
  const [, setIsSubmitted] = useAtom(submitAtom);
  const [user] = useAtom(userAtom);
  const id = params.transactionId;

  const submitData = async (user: IUser, data: TransactionFormData) => {
    await updateTransactionObject(user, data, id);
    setIsSubmitted(true);
  };

  useGetTransactionById(id);
  return (
    <>
      <AddTransaction onHandleSubmit={submitData} user={user} />
      <Link href='/pages/viewTransactions'>
        <button className='btn btn-primary'>Return</button>
      </Link>
      <div>
        <TransactionById transaction={transaction} key={id} />
      </div>
    </>
  );
};

export default EditTransaction;
