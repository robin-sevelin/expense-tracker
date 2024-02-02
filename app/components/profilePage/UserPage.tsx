'use client';

import React from 'react';
import { useAuthUser } from '@/hooks/useAuthUser';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { balanceAtom } from '@/store/atoms';
import { useGetExpenseSum } from '@/hooks/useGetExpenseSum';
import { useGetIncomeSum } from '@/hooks/useGetIncomeSum';

const UserPage = () => {
  const [balance] = useAtom(balanceAtom);
  const { recurringExpenseSum } = useGetExpenseSum();
  const { recurringIncomeSum } = useGetIncomeSum();
  const { user } = useAuthUser();

  return (
    <>
      <div className='flex flex-col justify-center items-center'>
        <picture className=' p-2 m-1'>
          <img
            src={user.photoURL}
            alt={user.displayName}
            width={75}
            height={75}
            loading='lazy'
            className=' rounded-full shadow-2xl '
          />
        </picture>
        <h2>{user.displayName}</h2>
        <p>{user.email}</p>
        <p></p>
        <p>
          If you need to set or update your budget or recurrent values go to
          EDIT BUDGET.
        </p>
        <Link href='/pages/editUserValues' className='btn btn-primary py-3'>
          <span>Edit budget</span>
        </Link>
        <div className='overflow-x-auto py-10'>
          <table className='table'>
            <thead>
              <tr>
                <th>Budget amount</th>
                <th>Reccuring expenses amount</th>
                <th>Reccuring incomes amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{balance} SEK</td>
                <td>{recurringExpenseSum} SEK</td>
                <td>{recurringIncomeSum} SEK</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserPage;
