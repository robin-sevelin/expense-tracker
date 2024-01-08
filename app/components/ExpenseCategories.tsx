import React from 'react';
import { EXPENSE_CATEGORIES } from '../constants/constants';

interface CategoryProps {
  onHandleChange: (category: string) => void;
}

const ExpenseCategories = ({ onHandleChange }: CategoryProps) => {
  const handleChange = (category: string) => {
    onHandleChange(category);
  };
  return (
    <>
      {EXPENSE_CATEGORIES.map((category) => (
        <div className=' m-2' key={category.id}>
          <input
            className='join-item btn m-2'
            type='radio'
            name='category'
            value={category.title}
            onChange={(e) => handleChange(e.target.value)}
            aria-label={category.title}
          />
        </div>
      ))}
    </>
  );
};

export default ExpenseCategories;
