'use client';

import React from 'react';
import { useAuthUser } from '@/hooks/useAuthUser';
import { useAtom } from 'jotai';
import { balanceAtom } from '@/store/atoms';
import { useGetRecurringExpenseSum } from '@/hooks/useGetRecurringExpenseSum';
import { useGetRecurringIncomeSum } from '@/hooks/useGetRecurringIncomeSum';
import AddBalance from '../formPage/AddBalance';
import Loading from '../sharedComponents/Loading';
import ProfilePicture from './ProfilePicture';

const UserPage = () => {
  const [balance] = useAtom(balanceAtom);
  const { recurringExpenseSum } = useGetRecurringExpenseSum();
  const { recurringIncomeSum } = useGetRecurringIncomeSum();
  const { user } = useAuthUser();

  return (
    <div className='flex flex-col justify-center items-center'>
      <ProfilePicture />
      <h2>{user.displayName}</h2>
      <p>{user.email}</p>
      <AddBalance />
      <div className='overflow-x-auto mt-[100px] '>
        <table className='table'>
          <tbody>
            <tr>
              <th>Budget</th>
              <td>{balance} SEK</td>
            </tr>
            <tr>
              <th>Reccuring expenses</th>
              <td>{recurringExpenseSum} SEK</td>
            </tr>
            <tr>
              <th>Reccuring incomes</th>
              <td>{recurringIncomeSum} SEK</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserPage;
