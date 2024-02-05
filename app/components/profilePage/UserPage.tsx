'use client';

import React from 'react';
import { useAuthUser } from '@/hooks/useAuthUser';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { balanceAtom } from '@/store/atoms';
import { useGetRecurringExpenseSum } from '@/hooks/useGetRecurringExpenseSum';
import { useGetRecurringIncomeSum } from '@/hooks/useGetRecurringIncomeSum';

const UserPage = () => {
  const [balance] = useAtom(balanceAtom);
  const { recurringExpenseSum } = useGetRecurringExpenseSum();
  const { recurringIncomeSum } = useGetRecurringIncomeSum();
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
        <p>If you need to set or update your budget go to EDIT BUDGET.</p>
        <Link href='/pages/editUserValues' className='btn btn-primary py-3'>
          <span>Edit budget</span>
        </Link>
        <div className='overflow-x-auto mt-[100px] '>
          <table className='table'>
            <tbody>
              <tr>
                <th>Budget amount</th>
                <td>{balance} SEK</td>
              </tr>
              <tr>
                <th>Reccuring expenses amount</th>
                <td>{recurringExpenseSum} SEK</td>
              </tr>
              <tr>
                <th>Reccuring incomes amount</th>
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
