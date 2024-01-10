import React from 'react';
import { INCOME_CATEGORIES } from '../constants/constants';

interface CategoryProps {
  onHandleChange: (category: string) => void;
}

const IncomeCategories = ({ onHandleChange }: CategoryProps) => {
  const handleChange = (category: string) => {
    onHandleChange(category);
  };
  return (
    <>
      {INCOME_CATEGORIES.map((category) => (
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

export default IncomeCategories;
