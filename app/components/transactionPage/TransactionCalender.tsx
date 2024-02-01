'use client';

import React, { useState } from 'react';
import { useGetCalenderDays } from '../../hooks/useGetCalenderDays';
import { useGetFilteredTransactions } from '../../hooks/useGetFIlteredTransaction';
import { ITransaction } from '../../models/ITransaction';
import ModalTransactionDay from '../sharedComponents/ModalTransactionDay';
import { DAY_BASE_VALUES } from '@/constants/constants';

interface Props {
  transactions: ITransaction[];
}

const TransactionCalender = ({ transactions }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { filtredTransactions } = useGetFilteredTransactions(transactions);
  const [selectedDay, setSelectedDay] = useState(DAY_BASE_VALUES);
  const { calenderArray } = useGetCalenderDays(
    filtredTransactions as ITransaction[]
  );

  const handleClick = (expense: number, income: number, day: number) => {
    setIsModalOpen(true);
    setSelectedDay({ incomeSum: income, expenseSum: expense, day: day });
  };

  return (
    <section className='flex w-3/5 m-auto justify-center items-center flex-wrap gap-4'>
      {calenderArray.map((day, index) => (
        <button
          key={index}
          onClick={() => handleClick(day.expenseSum, day.incomeSum, day.day)}
        >
          <div
            className={`bg-base-300 w-20 h-20 p-1 m-1 card cursor-pointer ${
              day.incomeSum !== 0 || day.expenseSum !== 0 ? 'with-border' : ''
            }`}
          >
            <h3>{day.day} </h3>
          </div>
        </button>
      ))}
      {isModalOpen && (
        <ModalTransactionDay
          selectedDay={selectedDay}
          isModalOpen={isModalOpen}
          onHandleChange={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
};

export default TransactionCalender;
