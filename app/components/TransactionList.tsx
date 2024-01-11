'use client';

import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { balanceAtom, userAtom } from '../store/atoms';
import { useAuthUser } from '../hooks/useAuthUser';
import { useGetTransactions } from '../hooks/useGetTransactions';
import { useGetSum } from '../hooks/useGetSum';
import NotFound from './NotFound';
import Loading from './Loading';
import Link from 'next/link';
import { useGetBalance } from '../hooks/useGetBalance';
import { deleteTransactionObject } from '@/firebase/firestore';

const TransactionList = () => {
  const [user] = useAtom(userAtom);
  const [balance] = useAtom(balanceAtom);
  const [isDeleted, setIsdeleted] = useState(false);
  const { isLoading, transactions } = useGetTransactions(isDeleted);
  const { sum } = useGetSum(transactions);

  const handleDelete = async (id: string) => {
    await deleteTransactionObject(user, id);
    setIsdeleted(true);
  };
  useAuthUser(user);
  useGetBalance();
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <h2> TransactionList</h2>
          {transactions?.length === 0 || !transactions ? (
            <NotFound />
          ) : (
            transactions.map((transaction) => (
              <div key={transaction.id}>
                <h3>Title: {transaction.title}</h3>
                <p>Amount: {transaction.amount} kr</p>
                <p>Type: {transaction.type}</p>

                <button
                  className='btn btn-secodary'
                  onClick={() => handleDelete(transaction.id)}
                >
                  Remove
                </button>
                <Link href={`/pages/${transaction.id}`}>
                  <button className='btn btn-primary'>Edit</button>
                </Link>
              </div>
            ))
          )}
          sum: {sum === 0 ? balance : sum} kr
        </div>
      )}
    </>
  );
};

export default TransactionList;
