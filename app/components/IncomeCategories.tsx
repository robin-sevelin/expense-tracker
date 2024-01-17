import React from 'react';
import { INCOME_CATEGORIES } from '../constants/constants';
import { UseFormRegister } from 'react-hook-form';
import { TransactionFormData } from '../models/FormData';

interface expenseCategoriesProps {
  register: UseFormRegister<TransactionFormData>;
}

const IncomeCategories = ({ register }: expenseCategoriesProps) => {
  return (
    <div className='join flex w-30'>
      {INCOME_CATEGORIES.map((category) => (
        <input
          key={category.id}
          checked
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

export default IncomeCategories;
