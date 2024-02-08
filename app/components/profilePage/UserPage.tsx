'use client';

import React from 'react';
import { useAuthUser } from '@/hooks/useAuthUser';
import { useAtom } from 'jotai';
import { balanceAtom } from '@/store/atoms';
import { useGetRecurringExpenseSum } from '@/hooks/useGetRecurringExpenseSum';
import { useGetRecurringIncomeSum } from '@/hooks/useGetRecurringIncomeSum';
import AddBalance from '../formPage/AddBalance';
import Loading from '../sharedComponents/Loading';

const UserPage = () => {
  const [balance] = useAtom(balanceAtom);
  const { recurringExpenseSum } = useGetRecurringExpenseSum();
  const { recurringIncomeSum } = useGetRecurringIncomeSum();
  const { user } = useAuthUser();

  if (!recurringExpenseSum || !recurringIncomeSum) {
    return <Loading />;
  }

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
    </>
  );
};

export default UserPage;
