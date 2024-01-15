import React from 'react';
import { INCOME_CATEGORIES } from '../constants/constants';
import { UseFormRegister } from 'react-hook-form';
import { TransactionFormData } from '../models/TransactionFormData';

interface expenseCategoriesProps {
  register: UseFormRegister<TransactionFormData>;
}

const IncomeCategories = ({ register }: expenseCategoriesProps) => {
  return (
    <>
      {INCOME_CATEGORIES.map((category) => (
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

export default IncomeCategories;
