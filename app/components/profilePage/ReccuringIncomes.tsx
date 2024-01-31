import { useAuthUser } from '@/app/hooks/useAuthUser';
import { IRecurringIncome } from '@/app/models/BudgetValues';
import { submitAtom } from '@/app/store/atoms';
import { deleteReccuringIncome } from '@/firebase/operations/deleteReccuringIncome';
import { useAtom } from 'jotai';
import React, { useState } from 'react';
import ModalDialog from '../sharedComponents/ModalDialog';

interface Props {
  incomes: IRecurringIncome[];
}

const ReccuringIncomes = ({ incomes }: Props) => {
  const { user } = useAuthUser();
  const [, setIsSubmitted] = useAtom(submitAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async (id: string) => {
    await deleteReccuringIncome(user, id);
    setIsSubmitted(true);
    setIsModalOpen(true);
  };
  return (
    <>
      <h2>Reccuring Incomes</h2>
      <div className=' flex max-w-3/4 flex-wrap gap-5 justify-center '>
        {incomes.map((income) => (
          <div
            key={income.id}
            className='card w-50 bg-neutral text-neutral-content mb-3'
          >
            <div className='card-body  items-center text-center'>
              <h3>{income.title}</h3>
              <p>{income.amount} kr</p>
              <p>day of month {income.date}</p>
              <div className='card-actions justify-end'>
                <button
                  className='btn btn-error w-20'
                  onClick={() => handleDelete(income.id)}
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

export default ReccuringIncomes;
