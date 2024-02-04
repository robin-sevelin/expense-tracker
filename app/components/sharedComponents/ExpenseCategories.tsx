import React from 'react';
import { EXPENSE_CATEGORIES } from '@/constants/constants';
import { UseFormRegister } from 'react-hook-form';
import { ITransaction } from '@/models/ITransaction';

interface expenseCategoriesProps {
  register: UseFormRegister<ITransaction>;
}

const ExpenseCategories = ({ register }: expenseCategoriesProps) => {
  return (
    <div className='join'>
      {EXPENSE_CATEGORIES.map((category) => (
        <input
          key={category.id}
          defaultChecked
          aria-label={category.title.toUpperCase()}
          className='join-item btn w-20'
          type='radio'
          value={category.title}
          {...register('category')}
          name='category'
        />
      ))}
    </div>
  );
};

export default ExpenseCategories;
