import AddBalance from '@/app/components/formPage/AddBalance';
import AddReccurentExpenses from '@/app/components/formPage/AddReccurentExpenses';
import AddReccurentIncomes from '@/app/components/formPage/AddReccurentIncomes';
import React from 'react';

const page = () => {
  return (
    <div>
      <AddBalance />
      <AddReccurentExpenses />
      <AddReccurentIncomes />
    </div>
  );
};

export default page;
