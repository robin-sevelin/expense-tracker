import { useAuthUser } from '@/app/hooks/useAuthUser';
import { IReccuringExpense } from '@/app/models/BudgetValues';
import { submitAtom } from '@/app/store/atoms';
import { deleteReccuringExpense } from '@/firebase/operations/deleteReccuringExpense';
import { useAtom } from 'jotai';
import Link from 'next/link';
import React, { useState } from 'react';
import ModalDialog from '../sharedComponents/ModalDialog';

interface Props {
  expenses: IReccuringExpense[];
}

const ReccuringExpenses = ({ expenses }: Props) => {
  const { user } = useAuthUser();
  const [, setIsSubmitted] = useAtom(submitAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async (id: string) => {
    await deleteReccuringExpense(user, id);
    setIsSubmitted(true);
    setIsModalOpen(true);
  };
  return (
    <>
      <h2>Reccuring Expenses</h2>
      <div className=' flex max-w-3/4 flex-wrap gap-5 justify-center '>
        {expenses?.map((expense) => (
          <div
            key={expense.id}
            className='card w-50 bg-neutral text-neutral-content mb-3'
          >
            <div className='card-body  items-center text-center'>
              <h3>{expense.title}</h3>
              <p>{expense.amount} kr</p>
              <p>day of month: {expense.date}</p>
              <div className='card-actions justify-end'>
                <button
                  className='btn btn-error w-20'
                  onClick={() => handleDelete(expense.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
        {isModalOpen && (
          <ModalDialog
            onHandleChange={() => setIsModalOpen(false)}
            isModalOpen={isModalOpen}
          />
        )}
      </div>
    </>
  );
};

export default ReccuringExpenses;
