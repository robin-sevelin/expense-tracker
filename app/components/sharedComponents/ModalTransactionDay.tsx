import { monthAtom } from '@/store/atoms';
import { useAtom } from 'jotai';
import React from 'react';

interface Props {
  onHandleChange: () => void;
  isModalOpen: boolean;
  selectedDay: {
    day: number;
    incomeSum: number;
    expenseSum: number;
  };
}

const ModalTransactionDay = ({
  onHandleChange,
  isModalOpen,
  selectedDay,
}: Props) => {
  const handleCheckboxChange = () => {
    onHandleChange();
  };

  const [currentMonth] = useAtom(monthAtom);
  return (
    <>
      <input
        type='checkbox'
        id='my_modal_6'
        className='modal-toggle'
        checked={isModalOpen}
        onChange={handleCheckboxChange}
      />
      <div className={`modal${isModalOpen ? ' open' : ''}`} role='dialog'>
        <div className='modal-box'>
          <h3 className='text-3xl font-bold mb-5'>
            {selectedDay.day}{' '}
            {currentMonth.toLocaleString('en-US', {
              month: 'long',
              year: 'numeric',
            })}
          </h3>
          {selectedDay.incomeSum > 0 && (
            <p className='py-4 '>
              Income sum:{' '}
              <span className='text-green-600 font-bold'>
                + {selectedDay.incomeSum}
              </span>{' '}
              kr
            </p>
          )}
          {selectedDay.expenseSum > 0 && (
            <p className='py-4 '>
              Expense sum:{' '}
              <span className='text-red-600 font-bold'>
                - {selectedDay.expenseSum}
              </span>{' '}
              kr
            </p>
          )}
          <div className='modal-action'>
            <label htmlFor='my_modal_6' className='btn'>
              Close
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalTransactionDay;
