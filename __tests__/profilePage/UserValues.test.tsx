import AddBalance from '@/components/formPage/AddBalance';
import AddReccurentExpenses from '@/components/formPage/AddRecurrningTransaction.tsx';
import AddReccurentIncomes from '@/components/formPage/AddReccurentIncomes';
import UserValues from '@/components/profilePage/UserValues';
import { render } from '@testing-library/react';

describe('User Values', () => {
  it('should render user values', () => {
    render(<UserValues />);
  });

  it('should render budget from', () => {
    render(<AddBalance />);
  });

  it('should render recurring expense form', () => {
    render(<AddReccurentExpenses />);
  });

  it('should render recurring incomes form', () => {
    render(<AddReccurentIncomes />);
  });
});
