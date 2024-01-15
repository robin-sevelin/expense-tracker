import React from 'react';
import { EXPENSE_CATEGORIES } from '../constants/constants';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { TransactionFormData } from '../models/FormData';

interface expenseCategoriesProps {
  register: UseFormRegister<TransactionFormData>;
}

const ExpenseCategories = ({ register }: expenseCategoriesProps) => {
  return (
    <>
      {EXPENSE_CATEGORIES.map((category) => (
        <div className=' m-2 float-right' key={category.id}>
          <label htmlFor={category.title}>
            {category.title}
            <input
              checked
              className='join-item btn m-2'
              type='radio'
              id='category'
              value={category.title}
              {...register('category')}
              name='category'
            />
          </label>
        </div>
      ))}
    </>
  );
};

export default ExpenseCategories;
