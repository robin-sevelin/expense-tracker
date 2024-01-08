import { title } from 'process';

export const ROUTES = [
  { id: 0, url: '/', text: 'Home' },
  { id: 1, url: '/pages/profile', text: 'Profile' },
  { id: 2, url: '/pages/graph/', text: 'Graph' },
  { id: 3, url: '/pages/viewTransactions/', text: 'View transactions' },
  { id: 4, url: '/pages/addTransactions/', text: 'Add transactions' },
];

export const USER_BASE_VALUES = {
  uid: '',
  email: '',
  displayName: '',
  photoURL: '',
};

export const BALANCE_BASE_VALUE = 0;

export const TRANSACTION_TYPES = {
  INCOME: 'income',
  EXPENSE: 'expense',
};

export const EXPENSE_CATEGORIES = [
  {
    id: 0,
    title: 'Joy',
  },
  {
    id: 1,
    title: 'Bills',
  },
  {
    id: 2,
    title: 'Food',
  },
  {
    id: 3,
    title: 'Other',
  },
];
