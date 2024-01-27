import React from 'react';
import { INCOME_CATEGORIES } from '../../constants/constants';
import { UseFormRegister } from 'react-hook-form';
import { ITransaction } from '@/app/models/ITransaction';

interface expenseCategoriesProps {
  register: UseFormRegister<ITransaction>;
}

const IncomeCategories = ({ register }: expenseCategoriesProps) => {
  return (
    <div className='join flex w-30'>
      {INCOME_CATEGORIES.map((category) => (
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

export default IncomeCategories;
